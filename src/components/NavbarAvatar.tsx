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
import { Link } from "@tanstack/react-router"

const logout = async () =>{
    // TODO log out the user

}


export function NavbarAvatar() {

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Avatar className='md:hidden w-12 h-12'>
                    <AvatarImage
                        src="https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png" />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-1">
                <DropdownMenuLabel>Juan Perez</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/profile">
                        <DropdownMenuItem>
                            <User />
                            <span>Mi perfil</span>
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
