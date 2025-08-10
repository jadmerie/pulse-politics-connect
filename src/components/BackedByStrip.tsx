import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import creator1 from "@/assets/avatars/creator1.jpg";
import creator2 from "@/assets/avatars/creator2.jpg";
import creator3 from "@/assets/avatars/creator3.jpg";
import creator4 from "@/assets/avatars/creator4.jpg";

const backers = [
  { src: creator1, name: "Liberty Voices PAC" },
  { src: creator2, name: "Civic Action Network" },
  { src: creator3, name: "Voters First Coalition" },
  { src: creator4, name: "United Grassroots" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const BackedByStrip: React.FC = () => {
  return (
    <section aria-label="Backed by political organizations" className="mt-6 animate-fade-in">
      <div className="flex items-center gap-4 rounded-lg border bg-card px-4 py-3 shadow-card">
        <span className="text-sm font-medium text-foreground">Backed by</span>
        <div className="flex -space-x-3">
          {backers.map((b, i) => (
            <Avatar key={i} className="h-9 w-9 ring-2 ring-background shadow-elegant">
              <AvatarImage src={b.src} alt={`${b.name} logo`} loading="lazy" />
              <AvatarFallback className="text-xs bg-muted text-foreground">
                {initials(b.name)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackedByStrip;
