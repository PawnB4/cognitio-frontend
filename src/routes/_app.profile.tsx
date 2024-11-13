import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";

export const Route = createFileRoute("/_app/profile")({
  component: Profile,
});

interface Character {
  id: number;
  image: string;
  alt: string;
}

function Profile() {
  const { user } = Route.useRouteContext();

  const handleChangeCharacter = (character: Character) => {
    // Implement character change logic here
    console.log("Character changed:", character);
  };

  return (
    <div className="col-span-full flex flex-col">
      {/* Back button section */}
      <div className="w-11/12 mx-auto mt-12 mb-8 hidden md:block">
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
            Volver
          </span>
        </Link>
      </div>

      {/* Main content container */}
      <div className="flex justify-center px-4">
        <div>
          {/* Profile Card */}
          <ProfileCard
            name={user.username}
            date="Septiembre 24 2001"
            avatarUrl={user.image_url}
            onChangeCharacter={handleChangeCharacter}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
