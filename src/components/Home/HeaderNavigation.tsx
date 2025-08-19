"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import i18n from "../../i18n/i18n.json"

export default function HeaderNavigation() {
  const [language, setLanguage] = useState<"EN" | "AR">("EN")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "AR" : "EN"
    setLanguage(newLang)
    document.documentElement.dir = newLang === "AR" ? "rtl" : "ltr"
  }

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
        setIsServicesOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const servicesColumns = [
    [
      { name: "Legal consultation Services", slug: "legal-consultation" },
      { name: "Foreign Investment services", slug: "foreign-investment" },
      { name: "Contracts", slug: "contracts" },
      { name: "Notarization", slug: "notarization" },
      { name: "Insurance", slug: "insurance" }
    ],
    [
      { name: "Defense in all Cases", slug: "defense-cases" },
      { name: "Banks and Financial Institutions", slug: "banks-financial" },
      { name: "Corporate Governance Services", slug: "corporate-governance" },
      { name: "Companies Liquidation", slug: "companies-liquidation" },
      { name: "Internal Regulations for Companies", slug: "internal-regulations" }
    ],
    [
      { name: "Services for Companies and Institution", slug: "company-services" },
      { name: "Arbitration", slug: "arbitration" },
      { name: "Intellectual Property", slug: "intellectual-property" },
      { name: "Corporate Restructuring and Reorganization", slug: "corporate-restructuring" }
    ],
    [
      { name: "Establishing National and Foreign Companies", slug: "company-establishment" },
      { name: "Commercial Agencies", slug: "commercial-agencies" },
      { name: "Supporting Vision 2030", slug: "vision-2030" },
      { name: "Estates", slug: "estates" }
    ]
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#00000066] backdrop-blur-md px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center font-[Poppins]">
        {/* Logo */}
        <div className="text-primary font-bold text-lg sm:text-xl">LOGO</div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 font-medium text-primary relative">
          <Link href="/" className="hover:text-secondary transition">{i18n[language].home}</Link>
          <Link href="/about" className="hover:text-secondary transition">{i18n[language].about}</Link>

          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
            <button className="flex items-center gap-1 hover:text-secondary transition" aria-haspopup="true" aria-expanded={isServicesOpen}>
              {i18n[language].services}
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[1000px] bg-[#4B2615] text-white p-6 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-lg rounded-lg">
                {servicesColumns.map((col, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    {col.map((service, idx) => (
                      <Link key={idx} href={`/services/${service.slug}`} className="hover:text-gray-300 transition">
                        {service.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-secondary transition">{i18n[language].blog}</Link>
          <Link href="/team" className="hover:text-secondary transition">{i18n[language].team}</Link>
          <Link href="/contact" className="hover:text-secondary transition">{i18n[language].contact}</Link>

          <button onClick={toggleLanguage} className="btn-outline">{language}</button>
          <button className="btn-primary">{i18n[language].bookAppointment}</button>

          <Search className="w-5 h-5 cursor-pointer hover:text-secondary transition ml-4" onClick={toggleSearch} />
        </div>

        {/* Mobile & Tablet Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer text-primary hover:text-secondary transition" onClick={toggleSearch} />
          <button onClick={() => setIsMobileMenuOpen(prev => !prev)} className="text-primary text-2xl font-bold" aria-label="Toggle menu">☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#000000cc] flex flex-col gap-4 py-4 px-4 text-primary lg:hidden">
          <Link href="/" className="hover:text-secondary transition">{i18n[language].home}</Link>
          <Link href="/about" className="hover:text-secondary transition">{i18n[language].about}</Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setIsServicesOpen(prev => !prev)}
              className="w-full text-left border-b border-gray-500 pb-2 mb-2 flex items-center justify-between"
              aria-expanded={isServicesOpen}
            >
              {i18n[language].services}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="max-h-60 overflow-y-auto flex flex-col gap-2 py-2">
                {servicesColumns.flat().map((service, idx) => (
                  <Link key={idx} href={`/services/${service.slug}`} className="w-full bg-[#4B2615] px-3 py-2 rounded hover:bg-[#5C301C] transition">
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-secondary transition">{i18n[language].blog}</Link>
          <Link href="/team" className="hover:text-secondary transition">{i18n[language].team}</Link>
          <Link href="/contact" className="hover:text-secondary transition">{i18n[language].contact}</Link>

          <button onClick={toggleLanguage} className="btn-outline mt-2">{language}</button>
          <button className="btn-primary mt-2">{i18n[language].bookAppointment}</button>
        </div>
      )}

      {/* Search Section */}
      {isSearchActive && (
        <section className="fixed top-[64px] left-0 w-full bg-white z-40 p-6 shadow-lg flex justify-center">
          <input
            type="text"
            placeholder={i18n[language].searchPlaceholder}
            className="w-full max-w-xl border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <X className="w-5 h-5 ml-3 cursor-pointer text-gray-600 hover:text-primary transition" onClick={toggleSearch} />
        </section>
      )}
    </>
  )
}
