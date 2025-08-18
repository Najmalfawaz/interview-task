"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import useRTL from "@/hooks/useRTL";

export default function Clients() {
  const isRTL = useRTL();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);

  // Button refs
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const testimonials = [
    {
      name: "Mohammed Saif",
      role: "CEO / Company",
      image: "/person.png",
      quote:
        "With the help of the hospitable staff I was able to get my work done without any hassle...",
    },
    {
      name: "Jane Doe",
      role: "CTO / Example Co",
      image: "/person.png",
      quote:
        "Great service, timely responses, and professional guidance. They made the process smooth...",
    },
  ];

  const updateButtons = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [swiperRef.current, prevRef.current, nextRef.current]);

  return (
    <section className="py-12 text-primary">
      <div className="section-container text-center">
        <h2 className="heading-primary mb-3">What our clients are saying</h2>
        <p className="text-secondary mb-10 max-w-2xl mx-auto text-base sm:text-lg">
          Our clients are our biggest advocates. Here's what they say about our services.
        </p>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            dir={isRTL ? "rtl" : "ltr"}
            slidesPerView={1}
            spaceBetween={20}
            onBeforeInit={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => updateButtons(swiper)}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 25 },
              768: { slidesPerView: 1, spaceBetween: 30 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center px-4 sm:px-6 lg:px-0">
                  <div className="card-bg-light relative w-full h-44 sm:h-52 md:h-56 lg:h-64 mx-auto max-w-xs lg:max-w-none">
                    <Image src={t.image} alt={t.name} fill className="object-cover rounded-lg" />
                  </div>
                  <div
                    className={`lg:col-span-2 ${isRTL ? "text-right" : "text-left"
                      } text-center lg:text-inherit mt-4 lg:mt-0`}
                  >
                    <p className="text-quote mb-4">{`"${t.quote}"`}</p>
                    <h4 className="font-bold text-lg sm:text-xl">{t.name}</h4>
                    <p className="text-secondary text-base sm:text-lg">{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Desktop buttons - bottom side */}
          <div
            className={`hidden lg:flex absolute bottom-4 gap-3 z-10 
    ${isRTL ? "left-4" : "right-4"}`}
          >
            {/* Prev Button */}
            <button
              ref={prevRef}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#4B2615] disabled:opacity-40 shadow-lg hover:bg-gray-100"
              disabled={isBeginning}
            >
              {isRTL ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <ChevronLeft className="w-6 h-6" />
              )}
            </button>

            {/* Next Button */}
            <button
              ref={nextRef}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#4B2615] disabled:opacity-40 shadow-lg hover:bg-gray-100"
              disabled={isEnd}
            >
              {isRTL ? (
                <ChevronLeft className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </button>
          </div>



          {/* Mobile / Tablet buttons */}
          <button
            ref={prevRef}
            className={`lg:hidden absolute top-1/3 ${isRTL ? "right-2" : "left-2"
              } w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-[#4B2615] shadow-lg disabled:opacity-40 hover:bg-gray-100 z-10`}
            disabled={isBeginning}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            ref={nextRef}
            className={`lg:hidden absolute top-1/3 ${isRTL ? "left-2" : "right-2"
              } w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-[#4B2615] shadow-lg disabled:opacity-40 hover:bg-gray-100 z-10`}
            disabled={isEnd}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
