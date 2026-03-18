import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string | ReactNode;
  href?: string;
}

// Added className to the props interface
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    // Merged the custom className here
    <nav className={`flex items-center gap-1.5 text-sm min-w-0 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 min-w-0">
          {i > 0 && (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
          )}

          {item.href ? (
            <Link
              href={item.href}
              className="shrink-0 font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="min-w-0 truncate font-medium text-foreground">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
