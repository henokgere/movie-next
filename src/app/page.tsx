import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import SearchForm from "../../components/searchForm";

type Movie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string | StaticImport
}

export default async function Home() {
  const response = await fetch('https://www.omdbapi.com/?apikey=a6980f76&s=princess&type=movie&p=1')

  const movies: {Search: []} = await response.json()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 sm:p-20">
      <SearchForm />
      {/* Movies Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.Search.map((movie: Movie, index) => (
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
    </div>
  );
}
