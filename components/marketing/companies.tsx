"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface Logo {
  title: string;
  src: string;
}

export const Companies = () => {
  let [logos, setLogos] = useState<Logo[][]>([
    [
      {
        title: "Raiffeisen Software",
        src: "/assets/logos/ossbig/raiffeisen-software.png",
      },
      {
        title: "Österreichische Nationalbank",
        src: "/assets/logos/ossbig/oesterreichische-nationalbank.png",
      },
      {
        title: "Twinformatics",
        src: "/assets/logos/ossbig/twinformatics.png",
      },
      {
        title: "Österreichische Lotterien",
        src: "/assets/logos/ossbig/oesterreichische-lotterien.png",
      },
      {
        title: "Styria Media IT",
        src: "/assets/logos/ossbig/styria-media-group.png",
      },
    ],
    [
      {
        title: "Bundeskanzleramt",
        src: "/assets/logos/ossbig/bundeskanzleramt.png",
      },
      {
        title: "BRZ",
        src: "/assets/logos/ossbig/brz.png",
      },
      {
        title: "ITSV",
        src: "/assets/logos/ossbig/itsv.png",
      },
      {
        title: "Magna Group",
        src: "/assets/logos/ossbig/magna.png",
      },
      {
        title: "Stadt Wien",
        src: "/assets/logos/ossbig/stadt-wien.png",
      },
    ],
  ]);
  const [activeLogoSet, setActiveLogoSet] = useState<Logo[]>(logos[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const flipLogos = () => {
    setLogos((currentLogos) => {
      const newLogos = [...currentLogos.slice(1), currentLogos[0]];
      setActiveLogoSet(newLogos[0]);
      setIsAnimating(true);
      return newLogos;
    });
  };

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        flipLogos();
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts or isAnimating changes
    }
  }, [isAnimating]);

  return (
    <div className="relative z-20 py-10 md:py-10">
      <h2 className="flex flex-col pb-10 pt-20 text-center text-4xl font-bold">
        <span className="relative mx-1 flex w-full items-center justify-center stroke-current">
          Task Force
          <svg
            className="absolute -bottom-0.5 max-h-1.5 w-56"
            viewBox="0 0 55 5"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
              stroke="currentColor"
              strokeWidth="2"
            ></path>
          </svg>
        </span>
        <span className="pt-3">
          &quot;AI Assisted Software Development&quot;
        </span>
      </h2>
      <Image
        src={"/assets/logos/ossbig/ossbig.png"}
        alt={"OSSBIG"}
        width="1048"
        height="1048"
        className="mx-auto h-48 w-48 object-contain filter dark:invert"
      />
      <h2 className="pt-10 text-center text-4xl font-bold">
        With participants from
      </h2>
      <p className="text-center text-sm text-muted-foreground">
        Other participants of the Task Force &quot;AI Assisted Software
        Development&quot;
      </p>

      <div className="relative mt-20 flex h-full w-full flex-wrap justify-center gap-10 rounded-xl p-10 dark:border dark:bg-neutral-100 md:gap-20">
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          {activeLogoSet.map((logo, idx) => (
            <motion.div
              initial={{
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 * idx,
                ease: [0.4, 0, 0.2, 1],
              }}
              key={logo.title}
              className="relative"
            >
              <Image
                src={logo.src}
                alt={logo.title}
                width="100"
                height="100"
                className="h-10 w-20 object-contain filter md:h-20 md:w-40"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
