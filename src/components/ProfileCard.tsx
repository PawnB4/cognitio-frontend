import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { CharacterSelection } from "@/components/CharacterSelection";

interface ProfileCardProps {
  name: string;
  date: string;
  avatarUrl?: string;
  onChangeCharacter: (character: Character) => void;
}

// Character options array
const characters: Character[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Girl with glasses",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Bear in suit",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Girl with glasses",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Bear in suit",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Girl with glasses",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Bear in suit",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Girl with glasses",
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/ddx4fkbj5/image/upload/v1728430959/seminario/wsvutrll42wgmpxaklzc.png",
    alt: "Bear in suit",
  },
];

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
  const [selectedCharacter, setSelectedCharacter] = useState(1); // Default character ID

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character.id);
    setIsDialogOpen(false);
    onChangeCharacter(character);
  };

  return (
    <div className="bg-white rounded-3xl w-full md:w-[500px] md:h-[600px] lg:w-[800px] flex flex-col md:flex-row lg:flex-col items-center justify-center overflow-hidden shadow-lg">
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
                characters.find((c) => c.id === selectedCharacter)?.image ||
                avatarUrl
              }
              alt="Selected character"
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
        />
      </div>
    </div>
  );
}
