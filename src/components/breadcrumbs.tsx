import { LucideSlash } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type BreadcrumbsProps = {
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <div className="flex h-16 items-center border-b px-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            let breadcrumbItem = (
              <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
            );

            if (breadcrumb.href) {
              breadcrumbItem = (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              );
            }
            return (
              <Fragment key={index}>
                <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <LucideSlash className="h-7 w-7" />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export { Breadcrumbs };
