import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

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
                className="w-full shadow-sm rounded-md"
            >
                <CarouselContent>
                    <CarouselItem>
                        <img src="https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg" alt="" className="shadow-sm rounded-md" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://images.pexels.com/photos/351961/pexels-photo-351961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="shadow-sm rounded-md" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://images.pexels.com/photos/267705/pexels-photo-267705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="shadow-sm rounded-md" />
                    </CarouselItem>
                </CarouselContent>
                {/* <CarouselPrevious /> */}
                {/* <CarouselNext /> */}
            </Carousel>
        </>
    )
}
