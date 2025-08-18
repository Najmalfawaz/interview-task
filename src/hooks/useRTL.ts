// // hooks/useRTL.ts
// 'use client';
// import { useEffect, useState } from "react";

// export default function useRTL() {
//   const [isRTL, setIsRTL] = useState(false);

//   useEffect(() => {
//     const updateDir = () => setIsRTL(document.documentElement.dir === "rtl");
//     updateDir();

//     const observer = new MutationObserver(updateDir);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });

//     return () => observer.disconnect();
//   }, []);

//   return isRTL;
// }


"use client"
import { useEffect, useState } from "react"

export default function useRTL() {
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    // Check if the document direction is RTL
    const checkRTL = () => {
      if (typeof window !== "undefined") {
        const dir = document.documentElement.dir || document.body.dir
        const computedDir = window.getComputedStyle(document.documentElement).direction
        setIsRTL(dir === "rtl" || computedDir === "rtl")
      }
    }

    checkRTL()

    // Listen for direction changes
    const observer = new MutationObserver(checkRTL)
    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dir"],
      })
    }

    return () => observer.disconnect()
  }, [])

  return isRTL
}
