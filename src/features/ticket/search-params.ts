import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const queryParser = parseAsString.withDefault("").withOptions({
  shallow: false,
});

export const sortParser = parseAsString.withDefault("newest").withOptions({
  shallow: false,
});

export const searchParamsCache = createSearchParamsCache({
  query: queryParser,
  sort: sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
