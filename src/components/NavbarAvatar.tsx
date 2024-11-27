import {
    LoaderCircle,
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "@tanstack/react-router"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from 'js-cookie'
import { useQueryClient } from "@tanstack/react-query"
import { SignupUserResponse } from "@/api/types"

type NavbarAvatarProps = {
    user: SignupUserResponse;
};

export const NavbarAvatar: React.FC<NavbarAvatarProps>= ({ user }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const logout = async () => {
        await Cookies.remove("access_token")
        await queryClient.invalidateQueries({
            queryKey: ['get-current-user'],
        })
        navigate({ to: "/login", replace: true })
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Avatar className='md:hidden w-12 h-12'>
                    <AvatarImage
                        src={user.image_url} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-1">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/profile">
                        <DropdownMenuItem>
                            <User />
                            <span>PERFIL</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link to="/progress">
                        <DropdownMenuItem>
                            <LoaderCircle />
                            <span>Mi progreso</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={logout}>
                        <LogOut />
                        <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
