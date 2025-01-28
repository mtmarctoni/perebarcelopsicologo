import { NavItem, SocialCardProps, BaseCardProps, Question, QuestionType, PhoneFormats } from "@/types/navbar";

import { EnvelopeIcon, LinkedinIcon, InstagramIcon, TwitterIcon, HandshakeIcon, LaptopIcon, UsersIcon, HeartbeatIcon, BrainIcon, ChartlineIcon, LightbulbIcon, StarIcon, BatteryIcon, BalanceIcon, HeartIcon } from "@/components/composables/Icons";

export const domain: string = 'perebarcelopsicologo.com';
export const wordpressBlogsJson = `https://${domain}/wp-json/wp/v2/posts`;
export const baseUrl: string = '';

export const navbarLinks: NavItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Conociendo a Pere Barceló', url: '/about' },
    {
        label: 'Mi Modo de trabajo', url: '/methodology', subLinks:
            [
                { label: 'Mejora tu rendimiento', url: '/performance' },
                { label: 'Mejora tu salud', url: '/mental' },
            ]
  },
    { label: 'Blog', url: '/blog' },
    { label: 'Contacto', url: '/contact' },
];

export const socialMediaLinks: SocialCardProps[] = [
    {
      name: 'Email',
      Icon: EnvelopeIcon,
      link: 'mailto:pere@perebarcelpsicologo.com',
      username: 'pere@perebarcelpsicologo.com'
    },
    {
      name: 'LinkedIn',
      Icon: LinkedinIcon,
      link: 'https://linkedin.com/in/perebarcelo',
      username: 'Pere Barceló'
    },
    {
      name: 'Instagram',
      Icon: InstagramIcon,
      link: 'https://instagram.com/perebarcelo',
      username: '@perebarcelo'
    },
    // Easy to add more social media here
];
  
export const socialMediaLinksFooter: SocialCardProps[] = [
  {
    name: 'LinkedIn',
    Icon: LinkedinIcon,
    link: 'https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/',
    username: 'Pere Barceló'
  },
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    link: 'https://www.instagram.com/perebarcelopsico/',
    username: '@perebarcelopsico'
  },
  {
    name: 'Twitter',
    Icon: TwitterIcon,
    link: 'https://x.com/PBarceloPsico',
    username: '@PBarceloPsico'
  },
  // Easy to add more social media here
];

export const methodologyCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/online-session.webp`,
    name: 'Sesiones Online',
    Icon: LaptopIcon,
    description: 'Sesiones personalizadas adaptadas a las características y requisitos particulares de cada atleta y su deporte.',
    link: 'contact',
  },
  {
    image: `${baseUrl}/stock/group-workshop.webp`,
    name: 'Talleres Grupales',
    Icon: UsersIcon,
    description: 'Diseñados para fomentar el aprendizaje colaborativo y fortalecer las habilidades interpersonales.',
    link: 'contact',
  },
  {
    image: `${baseUrl}/stock/club-consulting.webp`,
    name: 'Asesoramiento a Clubes',
    Icon: HandshakeIcon,
    description: 'Enfoque multidimensional que combina talleres, sesiones individuales y observación de entrenamientos.',
    link: '/contact',
  },
  // Easy to add more social media here
];

export const performanceCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/emotional-management.webp`,
    name: 'Gestión emocional',
    Icon: HeartbeatIcon,
    description: 'A la hora de competir siempre vas a tener que lidiar con muchas emociones. La gestión que hagas de las diferentes emociones que aparezcan marcarán en gran parte tus resultados.',
  },
  {
    image: `${baseUrl}/stock/concentration.webp`,
    name: 'Concentración',
    Icon: BrainIcon,
    description: 'La concentración es esencial para el rendimiento deportivo, ya que te permitirá enfocarte en el presente, bloquear distracciones y ejecutar habilidades con precisión.',
  },
  {
    image: `${baseUrl}/stock/self-confidence.webp`,
    name: 'Autoconfianza',
    Icon: ChartlineIcon,
    description: 'La autoconfianza es un pilar fundamental en el rendimiento deportivo, ya que influye directamente en tu capacidad para enfrentar desafíos y mantener la motivación.',
  },
  {
    image: `${baseUrl}/stock/motivation.webp`,
    name: 'Motivación',
    Icon: LightbulbIcon,
    description: 'La motivación es el motor esencial en el rendimiento deportivo, ya que te impulsa a fijarte metas, perseverar en el entrenamiento y superar desafíos.',
  },
  // Easy to add more social media here
];

export const mentalCards: BaseCardProps[] = [
  {
    image: `${baseUrl}/stock/emotional-health.webp`,
    name: 'Gestión emocional',
    Icon: HeartIcon,
    description: 'La gestión emocional es fundamental para la salud mental, ya que te permite comprender, regular y expresar las emociones de manera adecuada, promoviendo el equilibrio psicológico.',
  },
  {
    image: `${baseUrl}/stock/stress-management.webp`,
    name: 'Manejo del estrés',
    Icon: BalanceIcon,
    description: 'El manejo del estrés es crucial para preservar la salud mental, ya que el estrés crónico puede desencadenar problemas como ansiedad, depresión y agotamiento emocional.',
  },
  {
    image: `${baseUrl}/stock/burnout-prevention.webp`,
    name: 'Prevención del burnout',
    Icon: BatteryIcon,
    description: 'La prevención del burnout es esencial para proteger tu salud mental, ya que este síndrome afecta la capacidad de una persona para desempeñarse en su vida diaria y laboral.',
  },
  {
    image: `${baseUrl}/stock/self-esteem.webp`,
    name: 'Mejora de la autoestima',
    Icon: StarIcon,
    description: 'La autoestima es un componente esencial para la salud mental, ya que influye directamente en la forma en que te percibes a ti mismo y enfrentas los retos de la vida.',
  },
  // Easy to add more social media here
];

export const questions: Question[] = [
  {
    id: '1',
    question: '¿Cuál es tu nombre?',
    type: QuestionType.TEXT,
  },
  {
    id: '2',
    question: '¿Cuál es tu email?',
    type: QuestionType.EMAIL
  },
  {
    id: '3',
    question: '¿Cuál es tu número de teléfono?',
    type: QuestionType.PHONE,
    phoneFormat: Object.entries(PhoneFormats).map(([, value]) => (value))
  },
  {
    id: '4',
    question: '¿Por qué medio prefieres recibir una respuesta?',
    type: QuestionType.SELECT,
    options: ['Correo electrónico', 'WhatsApp', 'Llamada telefónica']
  },
  {
    id: '5',
    question: '¿En qué estás interesado?',
    type: QuestionType.SELECT,
    options: ['Sesiones online', 'Taller grupal', 'Asesoramiento psicológico']
  },
  {
    id: '6',
    question: '¿Hay algo más que quieras comentarme?',
    type: QuestionType.TEXTAREA,
  },
  {
    id: '7',
    question: '¡Gracias por contactar conmigo! Me pondré en contacto contigo lo antes posible.',
    type: QuestionType.SUCCESS
  }
];