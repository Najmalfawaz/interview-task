"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  profile_alt: string;
  bg_alt: string;
  profile_pic: { url: string };
  background_image: { url: string };
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [ready, setReady] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/hero-sections?populate=*"
        );
        const data = await res.json();

        const formattedSlides = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          description: item.description,
          profile_alt: item.profile_alt,
          bg_alt: item.bg_alt,
          profile_pic: { url: item.profile_pic?.url },
          background_image: { url: item.background_image?.url },
        }));

        setSlides(formattedSlides);
      } catch (err) {
        console.error("Error fetching hero slides:", err);
      }
    };

    fetchSlides();
    setReady(true);
    setTimeout(() => setLoopEnabled(true), 50); // enable loop after mount
  }, []);

  if (!ready) return null;

  return (
    <section
      className="relative w-full font-[Poppins] bg-black min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
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
            "swiper-pagination-bullet bg-white opacity-50 w-4 h-4 rounded-full my-2",
          bulletActiveClass:
            "swiper-pagination-bullet-active bg-primary opacity-100",
        }}
        className="h-screen w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 sm:gap-8 lg:gap-12 xl:gap-20 text-primary px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 lg:py-16">

              {/* Background Image */}
              <div className="absolute inset-0 -z-10 w-full h-full">
                {slide.background_image?.url && (
                  <Image
                    src={`http://localhost:1337${slide.background_image.url}`}
                    alt={slide.bg_alt}
                    fill
                    className="object-cover brightness-75"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)",
                  }}
                />
              </div>

              {/* Profile Image */}
              <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
                {slide.profile_pic?.url && (
                  <div className="relative w-48 sm:w-56 md:w-64 lg:w-80 xl:w-96 2xl:w-[450px] h-60 sm:h-72 md:h-80 lg:h-96 xl:h-[480px] 2xl:h-[520px] shadow-2xl bg-[#643F2E] overflow-hidden flex-shrink-0 transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src={slide.profile_pic.url}
                      alt={slide.profile_alt}
                      fill
                      className="object-cover"
                      loader={({ src }) =>
                        `http://localhost:1337${src}`
                      }
                    />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="relative w-full lg:w-1/2 lg:max-w-2xl text-center lg:text-left flex-shrink-0 z-10 order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <h2 className="sr-only">{slide.subtitle}</h2>
                <p className="text-secondary text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 lg:mb-12 leading-relaxed max-w-2xl font-light mx-auto lg:mx-0">
                  {slide.description}
                </p>
                <button className="btn-primary text-base sm:text-lg md:text-xl lg:text-2xl px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 lg:px-14 lg:py-6 font-medium hover:scale-105 transition-all duration-300">
                  Read More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical Left Pagination */}
      <div className="custom-pagination absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 z-20"></div>
    </section>
  );
}
