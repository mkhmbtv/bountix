import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-[420px]">
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-20 w-full" />

          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
