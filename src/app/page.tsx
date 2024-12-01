"use client";
import GameIconsUnderwear from "@/components/chaddi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Home() {
  const [color, setColor] = useState("white");
  const [chaddiColour, setChaddiColour] = useState("white");
  const [chaddiText, setChaddiText] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get("color");
    if (colorParam) {
      const decodedColor = decodeURIComponent(colorParam);
      setColor(decodedColor);
      setChaddiColour(decodedColor);
      setChaddiText(true);
    }
  }, []);

  const handleButtonClick = () => {
    setChaddiColour(color);
    const audio = new Audio("/music.mp3");
    audio.play();
    setChaddiText(true);
  };

  const shareButtonClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("color", encodeURIComponent(color));
    navigator.clipboard.writeText(url.toString());
  };

  const whatsappbuttonClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("color", encodeURIComponent(color));
    window.open(`https://wa.me/?text=${encodeURIComponent(url.toString())}`, '_blank');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-3xl font-semibold text-neutral-300">
          Kis Colour ki <span className="font-bold text-white">chaddi</span>{" "}
          peheno ho ?
        </h1>
        <Image
          className="rounded-xl"
          src="/chaddi.png"
          alt="Next.js logo"
          width={150}
          height={300}
          priority
        />
        <GameIconsUnderwear color={chaddiColour} fontSize={150} />
        <Input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="rounded-xl text-xl mx-2 max-w-lg"
          placeholder="Enter Chaddi Colour here"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleButtonClick}
            className="rounded-xl px-4 py-2 text-xl"
          >
            Change Chaddi Colour
          </Button>
          <Button
            onClick={shareButtonClick}
            variant={"secondary"}
            className="rounded-xl px-4 py-2 text-xl"
          >
            <Copy />
          </Button>
          <Button
            onClick={whatsappbuttonClick}
            variant={"secondary"}
            className="rounded-xl px-4 py-2 text-xl"
          >
            <IoLogoWhatsapp />
          </Button>
        </div>
        {chaddiText && (
          <p className="text-white">
            Aaj Maine{" "}
            <span style={{ color: chaddiColour }}>{chaddiColour}</span> ki
            peheni h!
          </p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {`Made With Love and Lust 🫦`}
      </footer>
    </div>
  );
}
