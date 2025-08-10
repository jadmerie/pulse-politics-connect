import React from "react";

interface PatrioticBannerProps {
  title: string;
  subtitle?: string;
  image: string;
  alt?: string;
}

const PatrioticBanner: React.FC<PatrioticBannerProps> = ({ title, subtitle, image, alt }) => {
  return (
    <section className="relative overflow-hidden rounded-xl border bg-card shadow-md animate-fade-in" aria-label={alt || title}>
      <img
        src={image}
        alt={alt || title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
      <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-brand text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          {subtitle ? (
            <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PatrioticBanner;
