import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Check, X } from "lucide-react";

interface Character {
  id: number;
  image: string;
  alt: string;
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

interface CharacterSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (character: Character) => void;
  currentCharacter: number | null;
}

export function CharacterSelection({
  isOpen,
  onClose,
  onSelect,
  currentCharacter,
}: CharacterSelectionProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-[700px] transform transition-all">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Elige tu personaje</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-gray-100">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative cursor-pointer group"
              onClick={() => onSelect(character)}
            >
              <Avatar className="w-16 h-16 rounded-full border-2 border-transparent group-hover:border-yellow-400 transition-all">
                <AvatarImage
                  src={character.image}
                  alt={character.alt}
                  className="object-cover"
                />
                <AvatarFallback>CH</AvatarFallback>
              </Avatar>
              {currentCharacter === character.id && (
                <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
