import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

const Heading = ({ title, description, className, children }: HeadingProps) => {
  return (
    <div className={cn("space-y-8 px-8", className)}>
      {children}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
    </div>
  );
};

export { Heading };
