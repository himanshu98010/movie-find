import React, { useEffect, useState } from "react";
import { api, api1 } from "../api/api";
import {
  Search,
  Star,
  TrendingUp,
  Calendar,
  Film,
  type LucideIcon,
} from "lucide-react";

interface Movie {
  id: number;
  title: string;
  image: string;
  vote_average: number;
  release_date: string;
  genre: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
}

interface MovieSectionProps {
  title: string;
  icon: LucideIcon;
  movies: Movie[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className="group relative  bg-slate-800  rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
    <div className="relative h-90 overflow-hidden">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-center group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
        <Star className="w-4 h-4 fill-current" />
        {movie.vote_average.toFixed(1)}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-neutral-100 mb-2 line-clamp-1">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 text-gray-300 text-sm mb-3 font-semibold">
        <span>{movie.release_date.substring(0, 4)}</span>
        <span>•</span>
        <span className="line-clamp-1">{movie.genre}</span>
      </div>
      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
        {movie.overview}
      </p>
      <button className="w-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 hover:from-gray-700 hover:via-gray-700 hover:to-gray-700 text-neutral-100 font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
        Read More
      </button>
    </div>
  </div>
);

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  icon: Icon,
  movies,
}) => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-6">
      <Icon className="w-8 h-8 text-neutral-300" />
      <h2 className="text-3xl font-bold text-neutral-300">{title}</h2>
    </div>
    <div className="flex gap-6 overflow-x-auto pb-4">
      {movies.map((movie: Movie) => (
        <div key={movie.id} className="flex-none w-72">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </section>
);

const MovieBox: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [latest, setlatest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    api1.get("/list").then((res) => {
      const genres = res.data.genres;

      const genreMap: Record<number, string> = {};
      genres.forEach((g: any) => {
        genreMap[g.id] = g.name;
      });

      api.get("/top_rated").then((res) => {
        console.log(res.data.results);
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setTopRatedMovies(moviesWithGenre);
      });

      api.get("/upcoming").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setUpcoming(moviesWithGenre);
      });

      api.get("/popular").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setPopularMovies(moviesWithGenre);
      });
      api.get("/now_playing").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setlatest(moviesWithGenre);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-10 h-10 text-neutral-200 " />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                MovieBox
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <input
                className="w-50 h-8 px-4 py-2 rounded-2xl text-neutral-300 border-solid border-neutral-400 border-2"
                placeholder="Search Movies"
              />
              <Search size={26} className="text-neutral-300" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <MovieSection
          title="Latest Releases"
          icon={Calendar}
          movies={upcoming}
        />
        <MovieSection
          title="Top Rated Movies"
          icon={Star}
          movies={topRatedMovies}
        />

        <MovieSection
          title="Most Popular"
          icon={TrendingUp}
          movies={popularMovies}
        />

        <MovieSection title="Upcoming" icon={Calendar} movies={upcoming} />
      </main>
    </div>
  );
};

export default MovieBox;
