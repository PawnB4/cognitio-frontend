import { useQuery } from "@tanstack/react-query";

interface CharacterSelectionProps {
  onSelect: (imageUrl: string) => void;
  currentCharacter: string;
}

export default function CharacterSelectionRegister({
  onSelect,
  currentCharacter,
}: CharacterSelectionProps) {
  const {
    data: imageUrls = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image/avatars`
      );
      if (!res.ok) throw new Error("Failed to fetch avatars");
      return res.json();
    },
  });

  if (isLoading) return <div className="text-center">Loading avatars...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error loading avatars</div>
    );

  return (
    <div className="bg-white p-4 rounded-md shadow-md h-full w-full align-middle">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {Array.isArray(imageUrls) &&
          imageUrls.map((imageUrl: string) => (
            <div
              key={imageUrl}
              className="relative cursor-pointer group"
              onClick={() => {
                onSelect(imageUrl);
              }}
            >
              <div
                className={`p-1 rounded-full transition-all duration-200 ${
                  currentCharacter === imageUrl
                    ? "bg-[#98C900] scale-110"
                    : "hover:bg-gray-800"
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Avatar option"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
