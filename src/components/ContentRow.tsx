/**
 * COMPONENTE CONTENT ROW - NETFLIX CLONE
 * Fila de contenido con carrusel horizontal usando TMDB API
 * Se usa en: home page
 * Funcionalidades: scroll horizontal, hover effects, datos reales de TMDB
 */

"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { type Movie, getImageUrl } from "@/lib/tmdb"

interface ContentRowProps {
  title: string
  items: Movie[]
  showNetflixBadge?: boolean
}

const ContentRow = ({ title, items, showNetflixBadge = false }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const getTitle = (item: Movie) => {
    return item.title || item.name || "Sin título"
  }

  const getReleaseYear = (item: Movie) => {
    const date = item.release_date || item.first_air_date
    return date ? new Date(date).getFullYear() : ""
  }

  const getBadgeText = (item: Movie, index: number) => {
    if (index < 3) return "TOP 10"
    if (item.vote_average > 8) return "Muy popular"
    if (item.release_date && new Date(item.release_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
      return "Nuevo"
    }
    return ""
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>

      <div className="relative group">
        {/* Botón scroll izquierda */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Carrusel de contenido */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-none w-48 md:w-56 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative group/item">
                <Image
                  src={getImageUrl(item.poster_path) || "/placeholder.svg"}
                  alt={getTitle(item)}
                  width={224}
                  height={336}
                  className="rounded-md object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=336&width=224&text=No+Image"
                  }}
                />

                {/* Logo N de Netflix */}
                {showNetflixBadge && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded">
                    N
                  </div>
                )}

                {/* Badge dinámico */}
                {getBadgeText(item, index) && (
                  <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {getBadgeText(item, index)}
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded">
                  ⭐ {item.vote_average.toFixed(1)}
                </div>

                {/* Overlay con información adicional */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/item:bg-opacity-60 transition-all duration-300 rounded-md flex items-end opacity-0 group-hover/item:opacity-100">
                  <div className="p-4 text-white">
                    <h4 className="font-semibold text-sm mb-1">{getTitle(item)}</h4>
                    <p className="text-xs text-gray-300">{getReleaseYear(item)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón scroll derecha */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default ContentRow
