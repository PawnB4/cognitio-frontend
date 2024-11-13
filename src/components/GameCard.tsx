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
import '../index.css'

type GameType = "read-and-conclude" | "who-was-it" | "syn-ant";

interface GameCardProps {
title: string;
description: string;
imgUrl: string;
game: GameType;
isThirdCard?: boolean; // New optional prop to indicate if it's the third card
}

export function GameCard({ title, description, imgUrl, game, isThirdCard = false }: GameCardProps) {
return (
  <Card className="min-h-[300px] max-w-s max-h-xs flex flex-col">
    <CardHeader>
      <img
        src={imgUrl}
        alt="Game Image"
        className={`rounded-lg ${isThirdCard ? 'w-[91%] h-auto mx-auto' : 'w-auto'}`} // Apply smaller width for the third card
      />
    </CardHeader>
    <CardContent className="flex flex-col gap-3">
      <CardTitle className="text-xl xl:text-xl text-balance text-center xl:text-left">{title}</CardTitle>
      <CardDescription className="text-xs md:text-sm text-balance font-bold text-white text-center md:text-left">{description}</CardDescription>
    </CardContent>
    <CardFooter className="mt-auto">
      <Button asChild className="w-full font-bold">
        <Link to={`/game/${game}`}>JUGAR</Link>
      </Button>
    </CardFooter>
  </Card>
);
}
