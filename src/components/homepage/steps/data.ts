interface ISteps {
  img: string;
  step: string;
  title: string;
  description: string;
  width: number;
}

export const dataSteps: ISteps[] = [
  {
    img: "/images/cover_steps/cv_1.png",
    step: "Крок 1",
    title: "Виберіть шаблон",
    description: "Виберіть шаблон резюме або завантажте існуюче",
    width: 230,
  },
  {
    img: "/images/cover_steps/cv_2.png",
    step: "Крок 2",
    title: "Додайте контент",
    description: "За допомогою декількох кліків заповніть шаблон",
    width: 252,
  },
  {
    img: "/images/cover_steps/cv_3.png",
    step: "Крок 3",
    title: "Адаптуйте під себе",
    description: "Оберіть кольори та шрифти за допомогою зручного інтерфейсу",
    width: 260,
  },
  {
    img: "/images/cover_steps/cv_4.png",
    step: "Крок 4",
    title: "Збережіть файл",
    description: "Завантажте своє покращене резюме у PDF форматі",
    width: 226,
  },
];
