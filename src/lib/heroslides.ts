// import { HeroSlide } from "@/types/hero";

// export async function getHeroSlides(): Promise<HeroSlide[]> {
//   const res = await fetch("http://localhost:1337/api/hero-sections?populate=*", {
//     next: { revalidate: 60 }, 
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch hero sections");
//   }

//   const data = await res.json();
//   return data.data;
// }