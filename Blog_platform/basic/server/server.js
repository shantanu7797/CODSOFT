const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./path/to/your/firebase-service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-project-id.firebaseio.com",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = admin.firestore();
const storage = admin.storage().bucket();

// Configure multer to handle file uploads to Firebase Storage
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// API endpoint for creating a blog
app.post("/api/blogs", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const image = req.file;

  if (!title || !content || !image) {
    return res
      .status(400)
      .json({ error: "Title, content, and image are required fields" });
  }

  const blogData = {
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  const imageFileName = `${Date.now()}_${image.originalname}`;
  const file = storage.file(imageFileName);

  const blobStream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  blobStream.on("error", (error) => {
    console.error("Error uploading image:", error);
    return res.status(500).json({ error: "Something went wrong" });
  });

  blobStream.on("finish", () => {
    // Once the image is uploaded to Firebase Storage, save the blog data and image URL to Firebase Firestore
    blogData.imageUrl = `https://storage.googleapis.com/${storage.name}/${imageFileName}`;

    db.collection("blogs")
      .add(blogData)
      .then((docRef) => {
        console.log("Blog added with ID:", docRef.id);
        return res.status(201).json({ message: "Blog created successfully" });
      })
      .catch((error) => {
        console.error("Error adding blog to Firestore:", error);
        return res.status(500).json({ error: "Something went wrong" });
      });
  });

  blobStream.end(image.buffer);
});

// API endpoint for fetching all blogs
app.get("/api/blogs", (req, res) => {
  db.collection("blogs")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      const blogs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        blogs.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
        });
      });
      return res.json(blogs);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({ error: "Something went wrong" });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
