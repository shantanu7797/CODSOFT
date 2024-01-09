import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { toast } from "./use-toast";

export const useCustomToast = () => {
    const loginToast = () => {
        const { dismiss } = toast({
            title: 'Login required',
            description: 'You must be logged in to perform this action.',
            variant: 'destructive',
            action: (
                <Link
                    href='/signin'
                    onClick={() => dismiss()}
                    className={buttonVariants({ variant: 'outline', className: 'text-slate-700' })}
                >
                    Login
                </Link>
            )
        })
    }

    return { loginToast };
}