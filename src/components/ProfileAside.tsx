import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




export const ProfileAside = () => {
    return (
        <div className="flex flex-col gap-6 px-8 items-center">
            <Avatar className='w-[150px] h-[150px]'>
                <AvatarImage
                    src="https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png" />
                <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <p className="text-secondary-foreground text-2xl">Juan Perez</p>
            <Button asChild variant={"outline"} size={"sm"} className="self-stretch">
                <Link to="/profile" className="w-full">Mi perfil</Link>
            </Button>
            <Button variant={"outline"} size={"sm"} className="self-stretch">
                <Link to="/progress" className="w-full">Mi progreso</Link>
            </Button>
        </div>
    )
}
