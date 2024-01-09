import React from "react";
import { SignUp } from "@/components";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";


const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl gap-20 mx-auto">
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span>Home</span>
            </Link>
            <SignUp />
        </div>
    )
}

export default SignUpPage
