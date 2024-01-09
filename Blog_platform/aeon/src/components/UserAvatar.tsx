import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({
    user, ...props
}) => {
    return (
        <Avatar className="w-8 h-8">
            {user?.image !== null ? (
                <div className="relative w-full h-full aspect-square">
                    <Image
                        src={user?.image!}
                        alt={user?.name!}
                        referrerPolicy="no-referrer"
                        width={500}
                        height={500}
                    />
                </div>
            ) : (
                <AvatarFallback>
                    {user?.name?.charAt(0)}
                </AvatarFallback>
            )}
        </Avatar>
    );
}

export default UserAvatar;