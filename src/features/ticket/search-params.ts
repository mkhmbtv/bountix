import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const queryParser = parseAsString.withDefault("").withOptions({
  shallow: false,
});

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
};

export const paginationParser = parseAsInteger.withDefault(1);

export const searchParams = {
  query: queryParser,
  page: paginationParser,
  ...sortParser,
};

export const searchParamsCache = createSearchParamsCache(searchParams);

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
