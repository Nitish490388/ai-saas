
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from '@clerk/clerk-react';

export const UserAvatar = () => {
     const { user } = useUser();

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl}/>
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
}