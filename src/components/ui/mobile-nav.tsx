import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MobileNavItem {
  label: string;
  href: string;
  onClick?: () => void;
  isActive?: boolean;
  isExternal?: boolean;
  variant?: 'default' | 'primary' | 'destructive';
}

interface MobileNavProps {
  items: MobileNavItem[];
  triggerClassName?: string;
  contentClassName?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  items,
  triggerClassName,
  contentClassName,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleItemClick = (item: MobileNavItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", triggerClassName)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn("w-[300px] sm:w-[400px] p-0", contentClassName)}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 space-y-1">
            {items.map((item, index) => {
              const isActive = item.isActive;
              const baseClasses = "flex w-full items-center px-4 py-3 text-sm font-medium rounded-md transition-colors";
              const variantClasses = {
                default: isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                primary: "bg-orange-500 text-white hover:bg-orange-600",
                destructive: "bg-red-500 text-white hover:bg-red-600",
              };

              const className = cn(
                baseClasses,
                variantClasses[item.variant || 'default']
              );

              if (item.isExternal) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={index}
                  href={item.href}
                  className={className}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}; 