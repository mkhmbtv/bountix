"use client";

import { useQueryState } from "nuqs";
import { Search } from "@/components/search";
import { queryParser } from "../search-params";

const TicketSearch = () => {
  const [query, setQuery] = useQueryState("query", queryParser);

  return (
    <Search
      defaultValue={query}
      onChange={setQuery}
      placeholder="Search tickets..."
    />
  );
};

export { TicketSearch };
