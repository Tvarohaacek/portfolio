import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Stylovaný nativní <select>.
 * Na mobilech otevírá systémový picker (lepší UX i přístupnost)
 * a oproti JS selectům nepřidává žádný JavaScript navíc.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full cursor-pointer appearance-none rounded-xl border border-input bg-white px-4 pr-10 text-sm text-ink shadow-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
