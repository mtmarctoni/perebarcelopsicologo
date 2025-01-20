import HandshakeIconSvg from '@/icons/handshake.svg';

export const HandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <HandshakeIconSvg {...props} />
);

import FutbolIconSvg from '@/icons/futbol.svg';

export const FutbolIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <FutbolIconSvg {...props} />
);

import GraduationcapIconSvg from '@/icons/graduation-cap.svg';

export const GraduationcapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <GraduationcapIconSvg {...props} />
);

import HeartIconSvg from "@/icons/heart.svg";

export const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <HeartIconSvg {...props} />
);
  
import BalanceIconSvg from "@/icons/balance.svg";

export const BalanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <BalanceIconSvg {...props} />
);

import BatteryIconSvg from "@/icons/battery.svg";

export const BatteryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <BatteryIconSvg {...props} />
);

import StarIconSvg from "@/icons/star.svg";

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <StarIconSvg {...props} />
);

// import ScrollIconSvg from "@/icons/scroll-indicator.svg";

// export const ScrollIcon = (props: React.SVGProps<SVGSVGElement>) => (
//     <ScrollIconSvg {...props} />
// );

interface Props {
    className?: string
}

export const ScrollIcon = ({className}: Props) => {

    return (
        <svg
            className={className}
            width="24"
            height="24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    )
}