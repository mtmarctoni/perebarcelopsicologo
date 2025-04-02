import Image from "next/image";
import Link from "next/link";
import { BaseCardProps } from "@/types/navbar";
import { IconCardContainer } from "./IconContainer";

const BaseCard = ({
  image,
  Icon,
  name,
  description,
  link,
}: BaseCardProps) => {
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//     <div className="relative h-48">
//       <Image
//         src="/stock/online-session.webp"
//         alt="Sesiones Online"
//         fill
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         className="object-cover"
//       />
//     </div>
//     <div className="p-6">
//       <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mb-4 mx-auto">
//         <LaptopIcon className="w-6 h-6" />
//       </div>
//       <h3 className="text-xl font-bold text-primary-dark mb-3">
//         Sesiones Online
//       </h3>
//       <p className="text-gray-600 mb-4">
//         Sesiones personalizadas adaptadas a las características y
//         requisitos particulares de cada atleta y su deporte.
//       </p>
//       <Link
//         href="/contact"
//         className="inline-block bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-primary transition-colors"
//       >
//         ¡Pide tu cita!
//       </Link>
//     </div>
//   </div>
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image
          src={`${image}`}
          alt={`${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
          </div>
          <div className="p-6 flex flex-col flex-grow">
              
          <IconCardContainer className="bg-secondary-light">
          <Icon />
          </IconCardContainer>
      <h3 className="text-xl text-text-dark font-bold mb-4">{name}</h3>
      <p className="mb-6 text-text">
       {description}
              </p>
              {link && <div className="text-center mt-auto">
                  
                  <Link
                      href={`${link}`}
                      className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-secondary transition-colors mt-auto"
                  >
                      ¡Pide Información!
                  </Link>
              </div>}
              </div>
    </div>
  );
};

export default BaseCard;
