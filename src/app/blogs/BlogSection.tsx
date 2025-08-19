"use client"

import { ArrowLeft, Calendar, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import en from "../../i18n/en.json"

interface BlogPost {
  id: number
  title: string
  description: string
  author?: string
  date?: string
  read_time?: string
  image?: {
    id: number
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
  }
}

export default function BlogPage() {
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://excellent-star-7cc5e6310d.strapiapp.com/api/blog-sections?populate=*"
        )
        const data = await res.json()
        setBlogPosts(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const skeletonArray = Array.from({ length: 6 })

  return (
    <div className="bg-gray-50 py-12">
      <section className="max-w-6xl mx-auto px-4 font-[Poppins]">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {en.blog.backButton}
        </button>

        {/* Blog Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{en.blog.pageTitle}</h1>
          <p className="text-lg text-gray-600">{en.blog.pageDescription}</p>
        </div>

        {/* Blog Posts */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? skeletonArray.map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg animate-pulse flex flex-col overflow-hidden"
                >
                  <div className="w-full h-48 bg-gray-300 sm:h-56 md:h-48 lg:h-40"></div>
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                      <div className="h-4 w-12 bg-gray-300 rounded"></div>
                      <div className="h-4 w-10 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            : blogPosts.map((post) => {
                const { title, description, author, date, read_time, image } = post
                const imageUrl = image?.formats?.medium?.url || image?.url

                return (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col transform hover:-translate-y-1"
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-48 object-cover sm:h-56 md:h-48 lg:h-40"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {title}
                      </h2>
                      <p className="text-gray-700 mb-4 flex-1">{description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-auto">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {author || en.blog.defaultAuthor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {date ? new Date(date).toLocaleDateString() : ""}
                        </div>
                        <span>{read_time || en.blog.defaultReadTime}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
        </div>

        {/* Closing Note */}
        {!loading && (
          <p className="mt-12 text-gray-700 leading-relaxed text-center md:text-left">
            {en.blog.closingNote}
          </p>
        )}
      </section>
    </div>
  )
}
