import { cn } from "@/lib/utils";
import { NavbarLinkItem } from "@/types";
import SmoothScrollLink from "./smooth-scroll-link";

type Props = {
  item: NavbarLinkItem;
  activeSection: string;
};

const NavbarLink = ({ item, activeSection }: Props) => {
  // destructure item
  const { label, url } = item;
  return (
    <SmoothScrollLink
      href={"#" + url}
      className={cn(
        "px-8 py-4 flex items-center justify-center text-center rounded-full",
        activeSection === url
          ? "bg-theme-orange text-white"
          : "bg-transparent hover:bg-theme-gray/30"
      )}
    >
      <span>{label}</span>
    </SmoothScrollLink>
  );
};

export default NavbarLink;
