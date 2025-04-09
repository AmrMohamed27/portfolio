"use client";
import { navigationItems } from "@/constants";
import useActiveSection from "@/hooks/use-active-section";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import NavbarLink from "./navbar-link";
import { DarkModeToggle } from "./dark-mode-toggle";

const Navbar = () => {
  const [firstHalf, secondHalf] = [
    navigationItems.slice(0, 3),
    navigationItems.slice(3),
  ];
  const sectionIds = navigationItems.map((item) => item.url);
  const activeSection = useActiveSection(sectionIds);
  return (
    <div className="top-2 left-0 sticky flex flex-row justify-center items-center w-full">
      <div className="bg-foreground dark:bg-theme-gray/30 p-2 rounded-full h-full text-background dark:text-foreground">
        {/* Desktop navbar */}
        <div className="hidden lg:flex flex-row items-center gap-2">
          {/* First Half */}
          {firstHalf.map((item) => (
            <NavbarLink
              key={item.id}
              item={item}
              activeSection={activeSection}
            />
          ))}
          {/* Logo */}
          <div className="flex justify-center items-center w-[150px] h-full">
            <Image
              src={"/assets/images/AM_logo_orange.png"}
              alt="Logo"
              width={64}
              height={64}
              className=""
            />
          </div>
          {/* Second Half */}
          {secondHalf.map((item) => (
            <NavbarLink
              key={item.id}
              item={item}
              activeSection={activeSection}
            />
          ))}
          <DarkModeToggle />
        </div>
        {/* Mobile Navbar */}
        <div className="lg:hidden flex flex-row justify-between items-center px-4 min-w-[300px]">
          {/* Logo */}
          <div className="flex justify-center items-center h-full">
            <Image
              src={"/assets/images/AM_logo_orange.png"}
              alt="Logo"
              width={48}
              height={48}
              className=""
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            {/* Menu */}
            <MobileMenu activeSection={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
