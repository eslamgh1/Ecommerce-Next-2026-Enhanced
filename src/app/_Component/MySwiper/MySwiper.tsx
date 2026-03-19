"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';

interface MySwiperProps {
    imageList: string[];
    spaceBetween?: number;
    slidesPerView?: number;
}

export default function MySwiper({ imageList, slidesPerView, spaceBetween }: MySwiperProps) {
    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className='w-full'
        >
            {imageList.map((src) => (
                <SwiperSlide key={src}>
                    <img 
                        className='w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover' 
                        src={src} 
                        alt="slide" 
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};