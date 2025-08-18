"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const services = [
  {
    title: "General Legal Consultations",
    description: "At Law Firm, we provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities. Our goal is to offer accurate legal advice based on a deep understanding of local and international laws."
  },
  {
    title: "Corporate Legal Consultations",
    description: "We at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses.",
    extraTitle: "Our advisory services about:",
    list: [
      "Establishing and registering companies.",
      "All kinds of contracts and agreements.",
      "Commercial disputes.",
      "Compliance with local and international laws and regulations."
    ]
  },
  {
    title: "Individual Legal Consultations",
    description: "Law Firm offers customized advisory services for individuals, including:",
    list: [
      "Family issues such as divorce, alimony, and custody.",
      "Real estate matters like buying, selling, and renting properties.",
      "Employment issues such as hiring and wrongful termination.",
      "Criminal cases and defending personal rights."
    ]
  }
];

export default function ServiceDetails() {
  const router = useRouter();

  return (
    <section className="relative w-full font-[Poppins] bg-white py-10 sm:py-14 lg:py-20 px-5 sm:px-10 lg:px-20">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm mb-6"
        style={{ color: "#4B2615" }}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6" style={{ color: "#4B2615" }}>
        Legal Consultation Services
      </h1>

      {/* Intro paragraph */}
      <p className="max-w-4xl mb-10 leading-relaxed" style={{ color: "#1E1E1E" }}>
        Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals
        and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients&apos;
        needs and offer the best legal solutions in various cases and legal fields, we provide our legal consultations
        services as a follow:
      </p>

      {/* Service sections */}
      <div className="space-y-10">
        {services.map((service, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "#4B2615" }}>
              {service.title}
            </h2>
            <div className="border-l-4 border-gray-300 pl-4 space-y-2">
              <p style={{ color: "#1E1E1E" }}>
                <span
                  className="inline-block w-2 h-2 rounded-sm mr-2"
                  style={{ backgroundColor: "#4B2615" }}
                ></span>
                {service.description}
              </p>
              {service.extraTitle && <p className="font-medium" style={{ color: "#1E1E1E" }}>{service.extraTitle}</p>}
              {service.list && (
                <ul className="list-disc list-inside text-gray-600 space-y-1" style={{ color: "#1E1E1E" }}>
                  {service.list.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Closing note */}
      <p className="mt-12 max-w-4xl leading-relaxed" style={{ color: "#1E1E1E" }}>
        At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal
        solutions. Contact us today to receive professional and comprehensive legal consultation.
      </p>
    </section>
  )
}
