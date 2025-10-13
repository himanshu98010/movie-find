import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../api/api";
import { ArrowLeft } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams(); // movie ID from URL
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await movieApi.get(
          `/${id}?append_to_response=videos,images,credits`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-neutral-100 p-8">
      <Link
        to="/"
        className="flex items-center text-neutral-300 hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-80 rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">{movie.release_date}</p>
          <p className="text-lg text-gray-300 mb-6">{movie.overview}</p>

          <div className="flex flex-wrap gap-3 mb-4">
            {movie.genres.map((g: any) => (
              <span
                key={g.id}
                className="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-yellow-400 font-semibold text-lg mb-3">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <p className="text-gray-400 text-sm">
            Runtime: {movie.runtime} mins | Language:{" "}
            {movie.original_language.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Optional: Trailer Section */}
      {movie.videos?.results?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Watch Trailer</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            title="Trailer"
            className="rounded-xl shadow-xl"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
