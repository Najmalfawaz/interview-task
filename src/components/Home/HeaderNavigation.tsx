"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Search, X } from "lucide-react"

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
      { name: "Insurance", slug: "insurance" },
    ],
    [
      { name: "Defense in all Cases", slug: "defense-cases" },
      { name: "Banks and Financial Institutions", slug: "banks-financial" },
      { name: "Corporate Governance Services", slug: "corporate-governance" },
      { name: "Companies Liquidation", slug: "companies-liquidation" },
      { name: "Internal Regulations for Companies", slug: "internal-regulations" },
    ],
    [
      { name: "Services for Companies and Institution", slug: "company-services" },
      { name: "Arbitration", slug: "arbitration" },
      { name: "Intellectual Property", slug: "intellectual-property" },
      { name: "Corporate Restructuring and Reorganization", slug: "corporate-restructuring" },
    ],
    [
      { name: "Establishing National and Foreign Companies", slug: "company-establishment" },
      { name: "Commercial Agencies", slug: "commercial-agencies" },
      { name: "Supporting Vision 2030", slug: "vision-2030" },
      { name: "Estates", slug: "estates" },
    ],
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#00000066] backdrop-blur-md px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center font-[Poppins]">
      {/* Logo */}
      <div className="text-primary font-bold text-lg sm:text-xl">LOGO</div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6 font-medium text-primary relative">
        <Link href="/" className="hover:text-secondary transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-secondary transition">
          About us
        </Link>

        {/* Services Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <button
            className="flex items-center gap-1 hover:text-secondary transition"
            aria-haspopup="true"
            aria-expanded={isServicesOpen}
          >
            Services
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

        <Link href="/blog" className="hover:text-secondary transition">
          Blog
        </Link>
        <Link href="/team" className="hover:text-secondary transition">
          Our Team
        </Link>
        <Link href="/contact" className="hover:text-secondary transition">
          Contact us
        </Link>

        {isSearchActive && (
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 border-2 border-white rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white h-10"
            autoFocus
          />
        )}

        {isSearchActive ? (
          <X className="w-5 h-5 cursor-pointer hover:text-secondary transition" onClick={toggleSearch} />
        ) : (
          <Search className="w-5 h-5 cursor-pointer hover:text-secondary transition" onClick={toggleSearch} />
        )}

        <button onClick={toggleLanguage} className="btn-outline">
          {language}
        </button>
        <button className="btn-primary">Book Appointment</button>
      </div>

      {/* Mobile & Tablet Menu Button */}
      <div className="lg:hidden flex items-center gap-4">
        {isSearchActive && (
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/10 border-2 border-white rounded-lg px-3 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white w-40 sm:w-48 h-10"
            autoFocus
          />
        )}

        {isSearchActive ? (
          <X className="w-5 h-5 cursor-pointer text-primary hover:text-secondary transition" onClick={toggleSearch} />
        ) : (
          <Search
            className="w-5 h-5 cursor-pointer text-primary hover:text-secondary transition"
            onClick={toggleSearch}
          />
        )}

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="text-primary text-2xl font-bold"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#000000cc] flex flex-col gap-4 py-4 px-4 text-primary lg:hidden">
          <Link href="/" className="hover:text-secondary transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-secondary transition">
            About us
          </Link>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setIsServicesOpen((prev) => !prev)}
              className="w-full text-left border-b border-gray-500 pb-2 mb-2 flex items-center justify-between"
              aria-expanded={isServicesOpen}
            >
              Services
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="max-h-60 overflow-y-auto flex flex-col gap-2 py-2">
                {servicesColumns.flat().map((service, idx) => (
                  <Link
                    key={idx}
                    href={`/services/${service.slug}`}
                    className="w-full bg-[#4B2615] px-3 py-2 rounded hover:bg-[#5C301C] transition"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-secondary transition">
            Blog
          </Link>
          <Link href="/team" className="hover:text-secondary transition">
            Our Team
          </Link>
          <Link href="/contact" className="hover:text-secondary transition">
            Contact us
          </Link>

          <button onClick={toggleLanguage} className="btn-outline mt-2">
            {language}
          </button>
          <button className="btn-primary mt-2">Book Appointment</button>
        </div>
      )}
    </nav>
  )
}
