"use client";
import {
  DesktopNavbar,
  NavItem,
} from "@/components/marketing/navbar/desktop-navbar";
import { MobileNavbar } from "@/components/marketing/navbar/mobile-navbar";
import { motion } from "framer-motion";
import { Blockchain01Icon, MagicWand01Icon, TableIcon } from "hugeicons-react";

const navItems: NavItem[] = [
  {
    icon: <MagicWand01Icon className="h-4 w-4" />,
    link: "#features",
    title: "Features",
  },
  {
    icon: <Blockchain01Icon className="h-4 w-4" />,
    link: "process.env.NEXT_PUBLIC_GITHUB_URL",
    title: "Synthui.v1 Model",
    target: "_blank",
  },
  {
    icon: <TableIcon className="h-4 w-4" />,
    link: "https://huggingface.co/datasets/JulianAT/SynthUI-Code-2k-v1",
    title: "v1 Dataset",
    target: "_blank",
  },
  {
    icon: <TableIcon className="h-4 w-4" />,
    link: "https://huggingface.co/datasets/JulianAT/SynthUI-Code-Instruct-2k-v1",
    title: "v1 Dataset (Instruct)",
    target: "_blank",
  },
];

export function NavBar() {
  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        ease: [0.6, 0.05, 0.1, 0.9],
        duration: 0.8,
      }}
      className="fixed inset-x-0 z-50 mx-auto w-full max-w-7xl lg:top-4"
    >
      <div className="hidden w-full lg:block">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden">
        <MobileNavbar navItems={navItems} />
      </div>
    </motion.nav>
  );
}

{
  /* <div className="hidden md:block ">
        <DesktopNavbar />
      </div>
      <div className="flex h-full w-full items-center md:hidden ">
        <MobileNavbar navItems={navItems} />
      </div> */
}
