// components/SmoothScrollLink.tsx
"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const SmoothScrollLink = ({
  href,
  children,
  className,
}: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only apply smooth scrolling for same-page hash links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState({}, "", href);
      }
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SmoothScrollLink;
