"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import en from "../../i18n/en.json";

interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  profile_alt: string;
  bg_alt: string;
  profile_pic?: { url: string };
  background_image?: { url: string };
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [loopEnabled, setLoopEnabled] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://excellent-star-7cc5e6310d.strapiapp.com/api/hero-sections/?populate=*"
        );
        const data = await res.json();

        const formattedSlides: HeroSlide[] = data.data.map((item: any) => ({
          id: item.id,
          title: item.title || en.hero.defaultTitle, // fallback to en.json
          subtitle: item.subtitle || en.hero.defaultSubtitle,
          description: item.description || en.hero.defaultDescription,
          profile_alt: item.profile_alt || en.hero.profileAlt,
          bg_alt: item.bg_alt || en.hero.bgAlt,
          profile_pic: item.profile_pic
            ? { url: item.profile_pic.url }
            : undefined,
          background_image: item.background_image
            ? { url: item.background_image.url } 
            : undefined,
        }));

        setSlides(formattedSlides);
      } catch (err) {
        console.error("Error fetching hero slides:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setLoopEnabled(true), 50);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-[#4B2615]">
        <div className="animate-pulse w-full max-w-6xl flex flex-col lg:flex-row gap-8 p-6">
          <div className="bg-[#5B3625] rounded-lg w-full lg:w-1/2 aspect-square" />
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="h-10 bg-[#5B3625] rounded w-3/4" />
            <div className="h-6 bg-[#5B3625] rounded w-1/2" />
            <div className="h-24 bg-[#5B3625] rounded w-full" />
            <div className="h-12 bg-[#5B3625] rounded w-40" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-black min-h-screen flex items-center overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={loopEnabled}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1000}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "swiper-pagination-bullet bg-white opacity-50 w-3 h-3 rounded-full my-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active bg-primary opacity-100",
        }}
        className="h-screen w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 text-primary px-6 lg:px-16 py-8">

              {/* Background Image */}
              {slide.background_image?.url && (
                <div className="absolute inset-0 -z-10 w-full h-full">
                  <Image
                    src={slide.background_image.url}
                    alt={slide.bg_alt}
                    fill
                    className="object-cover brightness-75"
                  />
                  <div className="absolute inset-0 hero-gradient" />
                </div>
              )}

              {/* Profile Image */}
              {slide.profile_pic?.url && (
                <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
                  <div className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-3/5 xl:w-2/5 aspect-square rounded-2xl overflow-hidden shadow-2xl bg-[#643F2E] transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src={slide.profile_pic.url}
                      alt={slide.profile_alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Text Content */}
              <div className="relative w-full lg:w-1/2 max-w-2xl text-center lg:text-left flex-shrink-0 z-10 order-2 lg:order-1">
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-secondary text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                  {slide.description}
                </p>
                <button className="bg-white text-black font-semibold w-[161px] h-[60px] rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                  {en.hero.readMore} {/* Button text from en.json */}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical Pagination */}
      <div className="custom-pagination absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 z-20"></div>
    </section>
  );
}
