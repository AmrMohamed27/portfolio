import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/constants";
import { MenuSquare } from "lucide-react";
import Image from "next/image";
import NavbarLink from "./navbar-link";

interface Props {
  activeSection: string;
}

const MobileMenu = ({ activeSection }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center gap-2 p-2 rounded-full text-white cursor-pointer">
          <MenuSquare size={36} />
          <span className="sr-only">Open Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Image
              src={"/assets/images/AM_logo_orange.png"}
              alt="Logo"
              width={48}
              height={48}
              className=""
            />
          </SheetTitle>
          <div className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <NavbarLink
                key={item.id}
                item={item}
                activeSection={activeSection}
              />
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
