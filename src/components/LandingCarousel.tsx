import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

import '../index.css'

import Autoplay from "embla-carousel-autoplay"


export const LandingCarousel = () => {
    return (
        <>
            <Carousel
                opts={{
                    align: "start",
                    loop: true
                }}
                plugins={[
                    Autoplay({
                        delay: 5000
                    })
                ]}
                className="w-full shadow-sm rounded-md carousel"
            >
                <CarouselContent>
                    <CarouselItem>
                        <img src="https://res.cloudinary.com/dr4iesryu/image/upload/v1731109327/Designer_3_1_exljks.svg" alt="kidgame" className="w-full h-full object-cover rounded-md" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://res.cloudinary.com/dr4iesryu/image/upload/v1731109293/Designer_4_1_ndttp9.svg" alt="kidgame" className="w-full h-full object-cover rounded-md" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://res.cloudinary.com/dr4iesryu/image/upload/v1731108904/Dise%C3%B1o_sin_t%C3%ADtulo_1_2_maikfa.svg" alt="kidgame" className="w-full h-full object-cover rounded-md" />
                    </CarouselItem>
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
            </Carousel>
        </>
    )
}
