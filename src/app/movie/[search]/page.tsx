'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { PageProps } from "../../../../.next/types/app/movie/[search]/page";
import { useFormStatus } from "react-dom";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};


export default function Searched(props: { params?: { search?: string } } & PageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState(props.params?.search || "");
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchMovies = async () => {
      if (query) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=a6980f76&s=${query}&type=movie&p=1`);
        const data = await response.json();
        setMovies(data.Search || []);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    setQuery(searchQuery);
  };

  return (
    <>
      <head>
        <meta name="description" content={query} />
      </head>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 sm:p-20">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-md flex items-center bg-gray-800 rounded-lg shadow-md p-2"
        >
          <input
            type="search"
            name="search"
            placeholder="Search a movie"
            className="flex-1 bg-transparent outline-none px-4 py-2 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {pending?'Searching':'Search'}
          </button>
        </form>

        {/* Movies Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md flex flex-col items-center text-center p-4"
            >
              <Image
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                height={250}
                width={250}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                <p className="text-gray-400">{movie.Type}</p>
                <p className="text-gray-500">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {movies.length === 0 && query && (
          <p className="mt-12 text-gray-500 text-lg">No movies found for {query}.</p>
        )}
      </div>
    </>
  );
}
