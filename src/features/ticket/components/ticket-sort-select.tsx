"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOptions } from "@/components/sort-select";
import { sortOptions,sortParser } from "../search-params";

type TicketSortSelectOptions = {
  options: SortSelectOptions[];
};

const TicketSortSelect = ({ options }: TicketSortSelectOptions) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect options={options} value={sort} onChange={setSort} />;
};

export { TicketSortSelect };
