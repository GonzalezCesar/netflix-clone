"use client";

import ContentRow from "@/components/ContentRow";
import NetflixNavbar from "@/components/NetflixNavbar";
import {
  type Movie,
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getTrending,
  getNowPlayingMovies,
  getUpcomingMovies,
  getOnTheAirTVShows,
  getNetflixContent,
  getMoviesByGenre,
  getTVShowsByGenre,
  GENRES,
} from "@/lib/tmdb";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [trendingContent, setTrendingContent] = useState<Movie[]>([]);
  const [netflixContent, setNetflixContent] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [onTheAirShows, setOnTheAirShows] = useState<Movie[]>([])
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyShows, setComedyShows] = useState<Movie[]>([]);
  const [dramaShows, setDramaShows] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setError(null);

        console.log("Iniciando carga de contenido desde TMDB...")

        const [
          trendingData,
          netflixData,
          popularMoviesData,
          popularTVData,
          topRatedMoviesData,
          nowPlayingData,
          upcomingData,
          onTheAirData,
          actionData,
          comedyData,
          dramaData,
          horrorData,
        ] = await Promise.all([
          getTrending("all", "week"),
          getNetflixContent(),
          getPopularMovies(),
          getPopularTVShows(),
          getTopRatedMovies(),
          getNowPlayingMovies(),
          getUpcomingMovies(),
          getOnTheAirTVShows(),
          getMoviesByGenre(GENRES.ACTION),
          getTVShowsByGenre(GENRES.COMEDY),
          getTVShowsByGenre(GENRES.DRAMA),
          getMoviesByGenre(GENRES.HORROR),
        ]);

        // Actualizar estados con los datos obtenidos
        setTrendingContent(trendingData.slice(0, 20))
        setNetflixContent(netflixData.slice(0, 20))
        setPopularMovies(popularMoviesData.slice(0, 20));
        setPopularTVShows(popularTVData.slice(0, 20));
        setTopRatedMovies(topRatedMoviesData.slice(0, 20))
        setNowPlayingMovies(nowPlayingData.slice(0, 20))
        setUpcomingMovies(upcomingData.slice(0, 20))
        setOnTheAirShows(onTheAirData.slice(0, 20))
        setActionMovies(actionData.slice(0, 20));
        setComedyShows(comedyData.slice(0, 20));
        setDramaShows(dramaData.slice(0, 20));
        setHorrorMovies(horrorData.slice(0, 20))

        console.log("Contenido cargado exitosamente:")
        console.log("- Trending:", trendingData.length)
        console.log("- Netflix:", netflixData.length)
        console.log("- Películas populares:", popularMoviesData.length)
        console.log("- Series populares:", popularTVData.length)
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4">
          </div>
            <p className="text-xl">Cargando películas desde TMDB</p>
            <p className="text-sm text-gray-400 mt-2">Obteniendo contenido real de The Movie Data Base</p>
        </div>
      </div>

      
    ) 
    }

    if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error de configuración</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-400 mb-2">Para solucionar:</p>
            <ol className="text-sm text-gray-300 list-decimal list-inside space-y-1">
              <li>Obtén tu API Key en themoviedb.org</li>
              <li>Crea un archivo .env.local</li>
              <li>Agrega: NEXT_PUBLIC_TMDB_API_KEY=tu_api_key</li>
              <li>Reinicia el servidor</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNavbar />
      
      <main className="pt-20 space-y-8 pb-8">
        {trendingContent.length > 0 && (
          <div className="relative h-[70vh] mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingContent[0].backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center h-full px-4 md:px-12">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{trendingContent[0].title || trendingContent[0].name}</h1>
                <p className="text-lg md:text-xl mb-6 line-clamp-3">{trendingContent[0].overview}</p>
                <div className="flex space-x-4">
                  <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition">Reproducir</button>
                  <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">Más información</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filas de contenido con películas reales de TMDB */}
        {trendingContent.length > 0 && (
          <ContentRow title="Tu próxima historia" items={trendingContent} useBackdrop={true} />
        )}

        {netflixContent.length > 0 && (
          <ContentRow title="Solo en Netflix" items={netflixContent} showNetflixBadge={true} useBackdrop={false} />
        )}

        {nowPlayingMovies.length > 0 && (
          <ContentRow title="En cines ahora" items={nowPlayingMovies} useBackdrop={true} />
        )}

        {popularMovies.length > 0 && (
          <ContentRow title="Películas populares" items={popularMovies} useBackdrop={true} />
        )}

        {popularTVShows.length > 0 && <ContentRow title="Series populares" items={popularTVShows} useBackdrop={true} />}

        {onTheAirShows.length > 0 && <ContentRow title="Series al aire" items={onTheAirShows} useBackdrop={false} />}

        {topRatedMovies.length > 0 && <ContentRow title="Mejor valoradas" items={topRatedMovies} useBackdrop={false} />}

        {actionMovies.length > 0 && <ContentRow title="Películas de acción" items={actionMovies} useBackdrop={true} />}

        {comedyShows.length > 0 && <ContentRow title="Comedias" items={comedyShows} useBackdrop={true} />}

        {dramaShows.length > 0 && <ContentRow title="Dramas" items={dramaShows} useBackdrop={false} />}

        {horrorMovies.length > 0 && <ContentRow title="Películas de terror" items={horrorMovies} useBackdrop={true} />}

        {upcomingMovies.length > 0 && (
          <ContentRow title="Próximos estrenos" items={upcomingMovies} useBackdrop={false} />
        )}
      </main>
    </div>
  );
}
