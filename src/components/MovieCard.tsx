import React, { useEffect, useState } from "react";
import { genreApi, movieApi, searchApi } from "../api/api";
import { Link } from "react-router-dom";
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
  <Link to={`/movie/${movie.id}`}>
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
    </div>{" "}
  </Link>
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
    <div id="section" className="flex gap-5 overflow-x-auto pb-4">
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    genreApi.get("/list").then((res) => {
      const genres = res.data.genres;

      const genreMap: Record<number, string> = {};
      genres.forEach((g: any) => {
        genreMap[g.id] = g.name;
      });

      movieApi.get("/top_rated").then((res) => {
        console.log(res.data.results);
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setTopRatedMovies(moviesWithGenre);
      });

      movieApi.get("/upcoming").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setUpcoming(moviesWithGenre);
      });

      movieApi.get("/popular").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setPopularMovies(moviesWithGenre);
      });
      movieApi.get("/now_playing").then((res) => {
        const moviesWithGenre = res.data.results.map((movie: any) => ({
          ...movie,
          genre: movie.genre_ids.map((id: number) => genreMap[id]).join(", "),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setlatest(moviesWithGenre);
      });
    });
  }, []);
  const handleSearch = async () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await searchApi.get("/movie", { params: { query: trimmed } });
      const results = res.data.results || [];
      setSearchResults(
        results.map((m: any) => ({
          ...m,
          image: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "",
        }))
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-3 py-1.5 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-10 h-10 text-neutral-200 " />
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                MovieBox
              </h1>
            </div>
            <div className="flex items-center gap-2  w-2xl max-w-md">
              <input
                className="flex-1 h-8 w-2 md:w-full px-2 md:h-10 md:px-4 rounded-2xl text-neutral-200 bg-gray-800/70 border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSearch}
                className="inline-flex items-center justify-center rounded-2xl h-8 md:h-10 px-4 bg-gray-700 hover:bg-gray-600 text-neutral-100 transition-colors disabled:opacity-60"
                disabled={isSearching}
                aria-label="Search"
              >
                <Search size={20} className="text-neutral-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {searchResults.length > 0 && (
          <MovieSection
            title="Search Results"
            icon={Search}
            movies={searchResults as any}
          />
        )}
        <MovieSection title="Latest Releases" icon={Calendar} movies={latest} />
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
