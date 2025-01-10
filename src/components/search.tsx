"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { queryParser } from "@/features/ticket/search-params";
import { Input } from "./ui/input";

type SearchProps = {
  placeholder: string;
};

const Search = ({ placeholder }: SearchProps) => {
  const [query, setQuery] = useQueryState("query", queryParser);

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
  }, 300);

  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        defaultValue={query}
        placeholder={placeholder}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

export { Search };
