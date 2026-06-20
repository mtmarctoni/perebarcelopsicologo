import { PhoneFormats, type Question, QuestionType } from "@/types/navbar";

export const questions: Question[] = [
  {
    id: "1",
    question: "¿Cuál es tu nombre?",
    type: QuestionType.TEXT,
  },
  {
    id: "2",
    question: "¿Cuál es tu email?",
    type: QuestionType.EMAIL,
  },
  {
    id: "3",
    question: "¿Cuál es tu número de teléfono?",
    type: QuestionType.PHONE,
    phoneFormat: Object.entries(PhoneFormats).map(([, value]) => value),
  },
  {
    id: "4",
    question: "¿Por qué medio prefieres recibir una respuesta?",
    type: QuestionType.SELECT,
    options: ["Correo electrónico", "WhatsApp", "Llamada telefónica"],
  },
  {
    id: "5",
    question: "¿En qué estás interesado?",
    type: QuestionType.SELECT,
    options: ["Sesiones online", "Taller grupal", "Asesoramiento psicológico"],
  },
  {
    id: "6",
    question: "¿Hay algo más que quieras comentarme?",
    type: QuestionType.TEXTAREA,
  },
  {
    id: "7",
    question: "¡Gracias por contactar conmigo! Me pondré en contacto contigo lo antes posible.",
    type: QuestionType.SUCCESS,
  },
];
