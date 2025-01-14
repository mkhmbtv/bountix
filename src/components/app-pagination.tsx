import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type AppPaginationProps = {
  page: number;
  totalPages: number;
  onPagination: (page: number) => void;
  isLoading: boolean;
};

const AppPagination = ({
  page,
  totalPages,
  onPagination,
  isLoading,
}: AppPaginationProps) => {
  const handlePrevious = () => {
    onPagination(page - 1);
  };

  const handleNext = () => {
    onPagination(page + 1);
  };

  return (
    <Pagination className="items-center gap-2">
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationButton isActive={false} onClick={handlePrevious}>
                {page - 1}
              </PaginationButton>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationButton isActive={true} onClick={() => onPagination(page)}>
            {page}
          </PaginationButton>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationButton onClick={handleNext}>
                {page + 1}
              </PaginationButton>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
      <div
        aria-label={isLoading ? "Loading" : "Idle"}
        aria-live={isLoading ? "polite" : undefined}
        className={cn(
          "h-2 w-2 rounded-full bg-green-500",
          isLoading && "animate-pulse bg-amber-500",
        )}
      />
    </Pagination>
  );
};

export { AppPagination };
