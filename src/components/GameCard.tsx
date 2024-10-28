import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"



type GameType = "read-and-conclude" | "who-was-it" | "syn-ant";

interface GameCardProps {
  title: string;
  description: string;
  imgUrl: string;
  game: GameType;
}

export function GameCard({ title, description, imgUrl, game }: GameCardProps) {
  return (
    <Card className="min-h-[500px] flex flex-col">
      <CardHeader>
        <img
          src={imgUrl}
          alt="Game Image"
          className="rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-balance">{title}</CardTitle>
        <CardDescription className="text-balance font-bold">{description}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link to={`/game/${game}`}>JUGAR</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
