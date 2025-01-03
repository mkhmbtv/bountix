import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TicketItemSkeleton = ({ isDetail }: { isDetail?: boolean }) => {
  return (
    <div
      className={cn("flex w-full gap-x-1", {
        "max-w-[420px]": !isDetail,
        "max-w-[580px]": isDetail,
      })}
    >
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  );
};

const TicketsSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      {[1, 2, 3].map((ticket) => (
        <TicketItemSkeleton key={ticket} />
      ))}
    </div>
  );
};

const TicketSkeleton = () => {
  return (
    <div className="flex justify-center py-24">
      <TicketItemSkeleton isDetail />
    </div>
  );
};

export { TicketItemSkeleton, TicketSkeleton, TicketsSkeleton };
