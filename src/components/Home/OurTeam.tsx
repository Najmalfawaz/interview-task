"use client"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import useRTL from "@/hooks/useRTL"
import "swiper/css"
import "swiper/css/navigation"

export default function OurTeam() {
  const isRTL = useRTL()
  const members = [
    { name: "Name Here", position: "Position Here", image: "/person.png" },
    { name: "Name Here", position: "Position Here", image: "/person.png" },
    { name: "Name Here", position: "Position Here", image: "/person.png" },
    { name: "Name Here", position: "Position Here", image: "/person.png" },
    { name: "Name Here", position: "Position Here", image: "/person.png" },
    { name: "Name Here", position: "Position Here", image: "/person.png" },
  ]

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const swiperRef = useRef<any>(null)

  const updateButtons = () => {
    if (!swiperRef.current) return
    const swiper = swiperRef.current
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  const buttonClasses = (disabled: boolean) =>
    `flex items-center justify-center rounded-full transition-colors duration-200 ${
      disabled ? "bg-[#7B4B2B]/50 cursor-not-allowed" : "bg-[#7B4B2B] hover:bg-[#643F2E]"
    }`

  // Reset swiper on RTL change
  useEffect(() => {
    if (swiperRef.current) swiperRef.current.update()
  }, [isRTL])

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#7B4B2B]">Our Team</h2>
      <p className="text-sm sm:text-base text-gray-500 max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <div className="max-w-7xl mx-auto flex items-center gap-4 lg:gap-8">
        {/* Left Navigation Button */}
        <button
          className={`hidden lg:flex w-12 h-12 ${buttonClasses(isBeginning)}`}
          aria-label="Previous team member"
          onClick={() =>
            !isBeginning &&
            (isRTL ? swiperRef.current?.slideNext() : swiperRef.current?.slidePrev())
          }
        >
          <FaChevronLeft className="text-lg text-white" />
        </button>

        <div className="flex-1 min-w-0">
          <Swiper
            modules={[Navigation]}
            dir={isRTL ? "rtl" : "ltr"}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
              updateButtons()
            }}
            onSlideChange={updateButtons}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              480: { slidesPerView: 1.2, spaceBetween: 16, centeredSlides: true },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="pb-4"
          >
            {members.map((member, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white overflow-hidden w-full max-w-[240px] sm:max-w-[260px] mx-auto transition duration-300">
                  <div className="relative w-full h-32 sm:h-36 lg:h-40 bg-[#643F2E]">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="bg-[#F3F3F3] p-3 sm:p-4 flex flex-col items-center">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 text-black">{member.name}</h3>
                    <p className="text-xs mb-2 sm:mb-3" style={{ color: "#15143966" }}>{member.position}</p>
                    <div className="flex justify-center gap-2 sm:gap-3 text-base sm:text-lg text-black">
                      <FaWhatsapp className="cursor-pointer hover:text-green-600 transition-colors duration-200 hover:scale-110 transform" />
                      <FaEnvelope className="cursor-pointer hover:text-yellow-600 transition-colors duration-200 hover:scale-110 transform" />
                      <FaLinkedin className="cursor-pointer hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Navigation Button */}
        <button
          className={`hidden lg:flex w-12 h-12 ${buttonClasses(isEnd)}`}
          aria-label="Next team member"
          onClick={() =>
            !isEnd &&
            (isRTL ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext())
          }
        >
          <FaChevronRight className="text-lg text-white" />
        </button>
      </div>

      {/* Mobile buttons */}
      <div className="flex justify-center gap-4 mt-6 lg:hidden">
        <button
          className={`w-10 h-10 ${buttonClasses(isBeginning)}`}
          aria-label="Previous team member"
          onClick={() =>
            !isBeginning &&
            (isRTL ? swiperRef.current?.slideNext() : swiperRef.current?.slidePrev())
          }
        >
          <FaChevronLeft className="text-sm text-white" />
        </button>
        <button
          className={`w-10 h-10 ${buttonClasses(isEnd)}`}
          aria-label="Next team member"
          onClick={() =>
            !isEnd &&
            (isRTL ? swiperRef.current?.slidePrev() : swiperRef.current?.slideNext())
          }
        >
          <FaChevronRight className="text-sm text-white" />
        </button>
      </div>
    </div>
  )
}
