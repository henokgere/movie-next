"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Redirect to the search result page when the query changes
  useEffect(() => {
    if (query) router.push(`/movie/${query}`);
  }, [query]);

  const searchMovie = (formdata: FormData) => {
    setQuery(formdata.get("searched") as string);
  };

  return (
    <form
      action={searchMovie}
      className="w-full max-w-md flex flex-col sm:flex-row items-center bg-gray-800 rounded-lg shadow-md p-4 gap-4"
    >
      {/* Label */}
      <h1 className="text-lg font-medium text-white whitespace-nowrap">Search a Movie:</h1>
      {/* Input and Button */}
      <div className="flex items-center w-full gap-2">
        <input
          type="search"
          name="searched"
          placeholder="Enter movie name..."
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
