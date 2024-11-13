import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Cookies from "js-cookie";

interface Character {
  id: number;
  image: string;
  alt: string;
}

interface CharacterSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (character: Character) => void;
  currentCharacter: string | null;
  characters: Character[];
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

export function CharacterSelection({
  isOpen,
  onClose,
  onSelect,
  currentCharacter,
  characters,
}: CharacterSelectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    currentCharacter
  );
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (character: Character) => {
    setSelectedImage(character.image);
  };

  const handleConfirm = async () => {
    if (!selectedImage) return;

    try {
      setIsUpdating(true);
      const accessToken = await Cookies.get("access_token");

      // Create URL with query parameter
      const url = new URL(`${baseURL}/user/update/image`);
      url.searchParams.append("image", selectedImage);

      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "bearer-token": `${accessToken}`,
        },
        // Remove body since we're using query parameters
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update image");
      }

      const character = characters.find((c) => c.image === selectedImage);
      if (character) {
        onSelect(character);
      }
      onClose();
    } catch (error) {
      console.error("Error updating image:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsUpdating(false);
    }
  };

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
          {characters.map((character,index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onClick={() => handleSelect(character)}
            >
              <div
                className={`p-1 rounded-full ${selectedImage === character.image ? "bg-[#98C900] p-3" : "bg-transparent"}`}
              >
                <Avatar className="w-16 h-16 rounded-full">
                  <AvatarImage
                    src={character.image}
                    alt={character.alt}
                    className="object-cover"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </div>
            </div>
          ))}
        </div>
        {selectedImage && selectedImage !== currentCharacter && (
          <div className="p-4 border-t flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-gray-500"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="bg-[#98C900] text-white hover:bg-[#7ba000]"
            >
              {isUpdating ? (
                "Actualizando..."
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
