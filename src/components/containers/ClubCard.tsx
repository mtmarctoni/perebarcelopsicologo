import Image from 'next/image';
import { Club } from '@/types/navbar';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <div className="group flex flex-col items-center p-4 sm:p-5 bg-background-alt/80 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-secondary/30 hover:bg-background-alt transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-lg h-full">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 transition-transform duration-500 ease-smooth group-hover:scale-110">
        <Image
          src={club.imgUrl}
          alt={club.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80px, 96px"
        />
      </div>
      <span className="text-xs sm:text-sm text-center font-medium text-text-dark/80 group-hover:text-text-dark transition-colors duration-300 line-clamp-2 leading-snug">
        {club.name}
      </span>
    </div>
  );
};

export default ClubCard;
