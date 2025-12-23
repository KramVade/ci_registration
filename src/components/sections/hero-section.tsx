import Image from "next/image";
import backgroundImage from "@/images/background.png";

export function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full">
      <Image
        src={backgroundImage}
        alt="Christmas Institute Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/30" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl font-koumon font-black tracking-wider" style={{ fontWeight: 900 }}>
            CHRISTMAS INSTITUTE 2025
          </p>
          <h1 className="text-6xl md:text-8xl font-koumon font-black my-4" style={{ fontWeight: 900 }}>
            BANYUHAY
          </h1>
          <p className="text-2xl md:text-3xl font-koumon font-bold italic mb-8" style={{ fontWeight: 500 }}>
            Bagong Anyo ng Buhay
          </p>
          <blockquote className="max-w-2xl mx-auto text-base md:text-lg italic border-l-4 border-foreground pl-4 text-left">
            <p>
              But that is not the way you learned Christ!—assuming that you have
              heard about him and were taught in him, as the truth is in Jesus,
              to put off your old self, which belongs to your former manner of
              life and is corrupt through deceitful desires, and to be renewed
              in the spirit of your minds, and to put on the new self, created
              after the likeness of God in true righteousness and holiness.
            </p>
            <cite className="block text-right mt-4 not-italic font-semibold">
              (EPHESIANS 4:20-24 ESV)
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
