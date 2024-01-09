function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("show");
}

document
  .getElementById("imageUploadForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById("imageInput");
    formData.append("image", fileInput.files[0]);

    try {
      const response = await fetch("../../image-upload/server", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imagePath = data.imagePath;
        displayImagePreview(imagePath);
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  });

function displayImagePreview(imagePath) {
  const imagePreviewDiv = document.getElementById("imagePreview");
  imagePreviewDiv.innerHTML = `<img src="${imagePath}" alt="Uploaded Image" width="300">`;
}
