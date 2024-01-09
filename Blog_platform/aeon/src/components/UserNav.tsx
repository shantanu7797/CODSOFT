'use client';

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropdownMenu";

interface UserNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}

const UserNav: FC<UserNavProps> = ({
    user
}) => {

    const handleSignOut = (e: any) => {
        e.preventDefault();
        signOut();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        name: user.name,
                        image: user.image
                    }}
                    className="w-6 h-6"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full bg-white" align="end">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg justify-normal">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.name &&
                            <p className="font-medium capitalize">
                                {user.name}
                            </p>
                        }
                        {user?.email &&
                            <p className="w-48 text-sm text-zinc-700">
                                {user.email}
                            </p>
                        }
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href='/profile'>
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href='/'>
                        Feed
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href='/p/create'>
                        Create Post
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserNav;