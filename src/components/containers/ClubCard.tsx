import Image from 'next/image';
import { Club } from '@/types/navbar';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <div className="flex flex-col items-center p-3 sm:p-4 bg-background-alt rounded-lg hover:bg-background hover:shadow-md transition-all h-full">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
        <Image
          src={club.imgUrl}
          alt={club.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80px, 96px"
        />
      </div>
      <span className="text-xs sm:text-sm text-center font-medium line-clamp-2 leading-snug">{club.name}</span>
    </div>
  );
};

export default ClubCard;