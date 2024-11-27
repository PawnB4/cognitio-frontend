import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState, useEffect } from "react";
import { CharacterSelection } from "@/components/CharacterSelection";

interface ProfileCardProps {
  name: string;
  date: string;
  avatarUrl?: string;
  onChangeCharacter: (character: Character) => void;
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

const profileAvatars = async () => {
  const res = await fetch(`${baseURL}/image/avatars`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

interface Character {
  id: number;
  image: string;
  alt: string;
}

export function ProfileCard({
  name,
  date,
  avatarUrl,
  onChangeCharacter,
}: ProfileCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(`${avatarUrl}`);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatars = await profileAvatars();
        const formattedAvatars = avatars.map(
          (avatar: string, index: number) => ({
            id: index + 1,
            image: avatar,
            alt: "Avatar",
          })
        );
        setCharacters(formattedAvatars);
      } catch (error) {
        console.error("Failed to fetch avatars", error);
      }
    };

    fetchAvatars();
  }, []);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character.image);
    setIsDialogOpen(false);
    onChangeCharacter(character);
  };

  return (
    <div className="bg-white rounded-2xl w-full md:w-[300px] md:h-[400px] lg:w-[600px] flex flex-col md:flex-row lg:flex-col items-center justify-center overflow-hidden shadow-lg mt-20">
      <div className="bg-yellow-400 p-4 w-full align-top">
        <div className="flex align-middle">
          <h2 className="text-white text-2xl font-medium w-full">{name}</h2>
          <h3 className="text-white/90 text-lg w-full text-end">{date}</h3>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center bg-white gap-5 h-full">
        <div>
          <Avatar>
            <AvatarImage
              src={
                characters.find((c) => c.image === selectedCharacter)?.image ||
                avatarUrl
              }
              alt="Selected character"
              className="w-30 h-60"
            />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>

        <Button
          variant="outline"
          className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-colors"
          onClick={() => setIsDialogOpen(true)}
        >
          CAMBIAR PERSONAJE
        </Button>

        <CharacterSelection
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSelect={handleCharacterSelect}
          currentCharacter={selectedCharacter}
          characters={characters}
        />
      </div>
    </div>
  );
}
