import {
  BalanceIcon,
  BatteryIcon,
  BrainIcon,
  ChartlineIcon,
  HandshakeIcon,
  HeartbeatIcon,
  HeartIcon,
  LaptopIcon,
  LightbulbIcon,
  StarIcon,
  UsersIcon,
} from "@/components/composables/Icons";
import type { BaseCardProps } from "@/types/navbar";
import { baseUrl } from "./constants";

export const methodologyCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/online-session.webp`,
    name: "Sesiones Online",
    Icon: LaptopIcon,
    description:
      "Sesiones personalizadas adaptadas a las características y requisitos particulares de cada atleta y su deporte.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/group-workshop.webp`,
    name: "Talleres Grupales",
    Icon: UsersIcon,
    description:
      "Diseñados para fomentar el aprendizaje colaborativo y fortalecer las habilidades interpersonales.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/club-consulting.webp`,
    name: "Asesoramiento a Clubes",
    Icon: HandshakeIcon,
    description:
      "Enfoque multidimensional que combina talleres, sesiones individuales y observación de entrenamientos.",
    link: "/contact",
  },
];

export const performanceCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/emotional-management.webp`,
    name: "Gestión emocional",
    Icon: HeartbeatIcon,
    description:
      "A la hora de competir siempre vas a tener que lidiar con muchas emociones. La gestión que hagas de las diferentes emociones que aparezcan marcarán en gran parte tus resultados.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/concentration.webp`,
    name: "Concentración",
    Icon: BrainIcon,
    description:
      "La concentración es esencial para el rendimiento deportivo, ya que te permitirá enfocarte en el presente, bloquear distracciones y ejecutar habilidades con precisión.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/self-confidence.webp`,
    name: "Autoconfianza",
    Icon: ChartlineIcon,
    description:
      "La autoconfianza es un pilar fundamental en el rendimiento deportivo, ya que influye directamente en tu capacidad para enfrentar desafíos y mantener la motivación.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/motivation.webp`,
    name: "Motivación",
    Icon: LightbulbIcon,
    description:
      "La motivación es el motor esencial en el rendimiento deportivo, ya que te impulsa a fijarte metas, perseverar en el entrenamiento y superar desafíos.",
    link: "/contact",
  },
];

export const mentalCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/emotional-health.webp`,
    name: "Gestión emocional",
    Icon: HeartIcon,
    description:
      "La gestión emocional es fundamental para la salud mental, ya que te permite comprender, regular y expresar las emociones de manera adecuada, promoviendo el equilibrio psicológico.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/stress-management.webp`,
    name: "Manejo del estrés",
    Icon: BalanceIcon,
    description:
      "El manejo del estrés es crucial para preservar la salud mental, ya que el estrés crónico puede desencadenar problemas como ansiedad, depresión y agotamiento emocional.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/burnout-prevention.webp`,
    name: "Prevención del burnout",
    Icon: BatteryIcon,
    description:
      "La prevención del burnout es esencial para proteger tu salud mental, ya que este síndrome afecta la capacidad de una persona para desempeñarse en su vida diaria y laboral.",
    link: "/contact",
  },
  {
    image: `${baseUrl}/stock/self-esteem.webp`,
    name: "Mejora de la autoestima",
    Icon: StarIcon,
    description:
      "La autoestima es un componente esencial para la salud mental, ya que influye directamente en la forma en que te percibes a ti mismo y enfrentas los retos de la vida.",
    link: "/contact",
  },
];
