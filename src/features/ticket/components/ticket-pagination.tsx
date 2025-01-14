"use client";

import { useQueryState } from "nuqs";
import { useEffect, useRef, useTransition } from "react";
import { AppPagination } from "@/components/app-pagination";
import { paginationParser, queryParser } from "../search-params";

type TicketPaginationProps = {
  totalTickets: number;
  ticketsPerPage: number;
};

const TicketPagination = ({
  totalTickets,
  ticketsPerPage,
}: TicketPaginationProps) => {
  const [isLoading, startTransition] = useTransition();
  const [page, setPage] = useQueryState(
    "page",
    paginationParser.withOptions({
      startTransition,
      shallow: false,
    }),
  );

  const [query] = useQueryState("query", queryParser);
  const queryRef = useRef(query);

  useEffect(() => {
    if (query === queryRef.current) return;
    queryRef.current = query;

    setPage(1);
  }, [query, setPage]);

  return (
    <AppPagination
      page={page}
      onPagination={setPage}
      totalPages={Math.ceil(totalTickets / ticketsPerPage)}
      isLoading={isLoading}
    />
  );
};

export { TicketPagination };
