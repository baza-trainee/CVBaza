import { ScreenSize } from "@/hooks/use-media";

interface ISteps {
  img: string;
  step: string;
  title: string;
  description: string;
  width: Record<ScreenSize, number>;
}

export const dataSteps: ISteps[] = [
  {
    img: "/images/cover_steps/cv_1.png",
    step: "Крок 1",
    title: "Виберіть шаблон",
    description: "Виберіть шаблон резюме або завантажте існуюче",
    width: {
      "2xl": 230,
      xl: 230,
      lg: 230,
      md: 238,
      mb: 230,
    },
  },
  {
    img: "/images/cover_steps/cv_2.png",
    step: "Крок 2",
    title: "Додайте контент",
    description: "За допомогою декількох кліків заповніть шаблон",
    width: {
      "2xl": 253,
      xl: 252,
      lg: 252,
      md: 261,
      mb: 253,
    },
  },
  {
    img: "/images/cover_steps/cv_3.png",
    step: "Крок 3",
    title: "Адаптуйте під себе",
    description: "Оберіть кольори та шрифти за допомогою зручного інтерфейсу",
    width: {
      "2xl": 260,
      xl: 260,
      lg: 260,
      md: 270,
      mb: 260,
    },
  },
  {
    img: "/images/cover_steps/cv_4.png",
    step: "Крок 4",
    title: "Збережіть файл",
    description: "Завантажте своє покращене резюме у PDF форматі",
    width: {
      "2xl": 226,
      xl: 226,
      lg: 226,
      md: 231,
      mb: 226,
    },
  },
];
