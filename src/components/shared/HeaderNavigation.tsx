"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import en from "../../i18n/en.json" 

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
      { name: en.services.legalConsultation, slug: "legal-consultation" },
      { name: en.services.foreignInvestment, slug: "foreign-investment" },
      { name: en.services.contracts, slug: "contracts" },
      { name: en.services.notarization, slug: "notarization" },
      { name: en.services.insurance, slug: "insurance" }
    ],
    [
      { name: en.services.defenseCases, slug: "defense-cases" },
      { name: en.services.banksFinancial, slug: "banks-financial" },
      { name: en.services.corporateGovernance, slug: "corporate-governance" },
      { name: en.services.companiesLiquidation, slug: "companies-liquidation" },
      { name: en.services.internalRegulations, slug: "internal-regulations" }
    ],
    [
      { name: en.services.companyServices, slug: "company-services" },
      { name: en.services.arbitration, slug: "arbitration" },
      { name: en.services.intellectualProperty, slug: "intellectual-property" },
      { name: en.services.corporateRestructuring, slug: "corporate-restructuring" }
    ],
    [
      { name: en.services.companyEstablishment, slug: "company-establishment" },
      { name: en.services.commercialAgencies, slug: "commercial-agencies" },
      { name: en.services.vision2030, slug: "vision-2030" },
      { name: en.services.estates, slug: "estates" }
    ]
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#00000066] backdrop-blur-md px-4 sm:px-6 lg:px-12 py-3 flex justify-between items-center">
      <div className="text-primary font-bold text-lg sm:text-xl">LOGO</div>

      <div className="hidden lg:flex items-center gap-6 font-medium text-primary relative">
        <Link href="/" className="hover:text-secondary transition">
          {en.nav.home}
        </Link>
        <Link href="/about" className="hover:text-secondary transition">
          {en.nav.about}
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
            {en.nav.services}
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

        <Link href="/blogs" className="hover:text-secondary transition">
          {en.nav.blog}
        </Link>
        <Link href="/team" className="hover:text-secondary transition">
          {en.nav.team}
        </Link>
        <Link href="/contact" className="hover:text-secondary transition">
          {en.nav.contact}
        </Link>

        {isSearchActive && (
          <input
            type="text"
            placeholder={en.nav.searchPlaceholder}
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
        <button className="btn-primary">{en.nav.book}</button>
      </div>

      {/* Mobile Menu remains similar */}
    </nav>
  )
}
