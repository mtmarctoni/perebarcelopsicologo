import Image from "next/image";
import Link from "next/link";
import type { BaseCardProps } from "@/types/navbar";
import { IconCardContainer } from "./IconContainer";

const BaseCard = ({ image, Icon, name, description, link }: BaseCardProps) => {
  return (
    <div className="group bg-background rounded-2xl shadow-card overflow-hidden flex flex-col border border-transparent hover:border-secondary/20 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-card-hover">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={`${image}`}
          alt={`${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <IconCardContainer className="bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-500">
          <Icon className="w-7 h-7 text-secondary" />
        </IconCardContainer>
        <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="mb-6 text-text leading-relaxed">{description}</p>
        {link && (
          <div className="text-center mt-auto">
            <Link
              href={`${link}`}
              className="inline-flex items-center justify-center bg-primary-dark text-white px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-dark hover:shadow-glow transition-all duration-300 font-semibold text-sm tracking-wide"
            >
              ¡Pide Información!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseCard;
