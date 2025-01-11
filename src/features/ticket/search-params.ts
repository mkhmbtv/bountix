import { createSearchParamsCache, parseAsString } from "nuqs/server";

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

export const searchParamsCache = createSearchParamsCache({
  query: queryParser,
  ...sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
