"use client"

import { useRouter } from "next/navigation"
import LegalConsultation from "@/components/service-details/legal-consultation"

interface ServicePageProps {
    params: { slug: string }
}

export default function ServicePage({ params }: ServicePageProps) {
    const { slug } = params
    const router = useRouter()

    switch (slug) {
        case "legal-consultation":
            return (
                <div className="min-h-screen bg-white">
                    <div
                        className="relative h-64 sm:h-80 lg:h-96 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/bg.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                    <LegalConsultation />
                </div>
            )
        default:
            return (
                <div className="min-h-screen bg-white">
                    <div
                        className="relative h-64 sm:h-80 lg:h-96 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/bg.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>

                    <div className="px-4 pt-6">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
                        >
                            <svg
                                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    </div>

                    <div className="max-w-6xl mx-auto py-20 px-4 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                We're working hard to bring you this service. Stay tuned for updates!
                            </p>
                            <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                                In Development
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}
