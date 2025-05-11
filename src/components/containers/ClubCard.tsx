import Image from 'next/image';
import { Club } from '@/types/navbar';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <div className="flex flex-col items-center p-3 bg-background-alt rounded-lg hover:bg-background transition-colors h-full">
      <div className="relative w-24 h-24 mb-2">
        <Image
          src={club.imgUrl}
          alt={club.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100px, 150px"
        />
      </div>
      <span className="text-sm text-center font-medium font-semibold">{club.name}</span>
    </div>
  );
};

export default ClubCard;