import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { useQueryClient } from "@tanstack/react-query";


export const Route = createFileRoute("/_app/profile")({
  component: Profile,
});



function Profile() {
  const { user } = Route.useRouteContext();

  const queryClient = useQueryClient()


  const handleChangeCharacter = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['get-current-user'],
    })
  };

  return (
    <div className="col-span-full flex flex-col">
      <div className="w-11/12 mx-auto mt-12 hidden md:block">
        <Link
          to="/dashboard"
          className="flex select-none items-center gap-4 cursor-pointer group"
        >
          <CircleArrowLeft
            fill="#4ABC96"
            stroke="white"
            size={60}
            strokeWidth={1}
            className="group-hover:scale-105 transition-transform"
          />
          <span className="text-2xl font-bold text-white tracking-wide">
            VOLVER
          </span>
        </Link>
      </div>

      {/* Main content container */}
      <div className="flex justify-center px-4">
        <div>
          {/* Profile Card */}
          <ProfileCard
            name={user.username}
            date=""
            avatarUrl={user.image_url}
            onChangeCharacter={handleChangeCharacter}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
