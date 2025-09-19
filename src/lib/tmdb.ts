/**
 * CONFIGURACIÓN TMDB API - NETFLIX CLONE
 * Configuración y funciones para interactuar con The Movie Database API
 * Documentación: https://developers.themoviedb.org/3
 */

const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// API Key desde variables de entorno
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export interface Movie {
  id: number
  title: string
  name?: string // Para series de TV
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  first_air_date?: string // Para series de TV
  vote_average: number
  genre_ids: number[]
  media_type?: "movie" | "tv"
  adult: boolean
  original_language: string
  popularity: number
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

// Función para construir URLs de imágenes
export const getImageUrl = (path: string | null, size = "w500") => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// Función base para hacer requests a TMDB
const tmdbFetch = async (endpoint: string): Promise<TMDBResponse> => {
  if (!TMDB_API_KEY) {
    console.error(
      "TMDB API Key no encontrada. Asegúrate de configurar NEXT_PUBLIC_TMDB_API_KEY en tu archivo .env.local",
    )
    throw new Error("TMDB API Key no configurada")
  }

  const separator = endpoint.includes("?") ? "&" : "?"
const url = `${TMDB_BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}&language=es-ES&region=ES`

  console.log("Fetching from TMDB:", endpoint) // Para debug

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} - ${response.statusText}`)
    }
    const data = await response.json()
    console.log(`TMDB Response for ${endpoint}:`, data.results?.length, "items") // Para debug
    return data
  } catch (error) {
    console.error("Error fetching from TMDB:", error)
    throw error
  }
}

// Obtener películas populares
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/movie/popular")
    return data.results
  } catch (error) {
    console.error("Error getting popular movies:", error)
    return []
  }
}

// Obtener series populares de TV
export const getPopularTVShows = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/tv/popular")
    return data.results
  } catch (error) {
    console.error("Error getting popular TV shows:", error)
    return []
  }
}

// Obtener películas mejor valoradas
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/movie/top_rated")
    return data.results
  } catch (error) {
    console.error("Error getting top rated movies:", error)
    return []
  }
}

// Obtener series mejor valoradas
export const getTopRatedTVShows = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/tv/top_rated")
    return data.results
  } catch (error) {
    console.error("Error getting top rated TV shows:", error)
    return []
  }
}

// Obtener contenido trending (películas y series)
export const getTrending = async (
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "week",
): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch(`/trending/${mediaType}/${timeWindow}`)
    return data.results
  } catch (error) {
    console.error("Error getting trending content:", error)
    return []
  }
}

// Obtener películas que están en cines ahora
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/movie/now_playing")
    return data.results
  } catch (error) {
    console.error("Error getting now playing movies:", error)
    return []
  }
}

// Obtener próximos estrenos
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/movie/upcoming")
    return data.results
  } catch (error) {
    console.error("Error getting upcoming movies:", error)
    return []
  }
}

// Obtener series que están al aire
export const getOnTheAirTVShows = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/tv/on_the_air")
    return data.results
  } catch (error) {
    console.error("Error getting on the air TV shows:", error)
    return []
  }
}

// Obtener películas por género
export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`)
    return data.results
  } catch (error) {
    console.error("Error getting movies by genre:", error)
    return []
  }
}

// Obtener series por género
export const getTVShowsByGenre = async (genreId: number): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch(`/discover/tv?with_genres=${genreId}&sort_by=popularity.desc`)
    return data.results
  } catch (error) {
    console.error("Error getting TV shows by genre:", error)
    return []
  }
}

// Obtener contenido de Netflix (usando network_id de Netflix)
export const getNetflixContent = async (): Promise<Movie[]> => {
  try {
    const data = await tmdbFetch("/discover/tv?with_networks=213&sort_by=popularity.desc")
    return data.results
  } catch (error) {
    console.error("Error getting Netflix content:", error)
    return []
  }
}

// Géneros de TMDB
export const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
  // Géneros de TV
  ACTION_ADVENTURE: 10759,
  KIDS: 10762,
  NEWS: 10763,
  REALITY: 10764,
  SOAP: 10766,
  TALK: 10767,
  WAR_POLITICS: 10768,
}
