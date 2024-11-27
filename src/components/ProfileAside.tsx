import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignupUserResponse } from "@/api/types"

type ProfileAsideProps = {
    user: SignupUserResponse;
  };
  

export const ProfileAside: React.FC<ProfileAsideProps> = ({user}) => {

    return (
        <div className="flex flex-col gap-6 px-8 items-center">
            <Avatar className='w-[150px] h-[150px]'>
                <AvatarImage
                    src={user.image_url} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-secondary-foreground text-2xl">{user.username.toUpperCase()}</p>
            <Button asChild variant={"outline"} size={"sm"} className="self-stretch">
                <Link to="/profile" className="w-full">PERFIL</Link>
            </Button>
            <Button variant={"outline"} size={"sm"} className="self-stretch">
                <Link to="/progress" className="w-full">PROGRESO</Link>
            </Button>
        </div>
    )
}
