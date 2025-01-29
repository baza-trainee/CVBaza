"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";

const apiKey = env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function generateTextGemini(
  letterData: {
    fullName: string;
    profession: string;
    position: string;
    company: string;
  },
  locale: string = "en"
) {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured");
  }

  const prompt =
    locale === "ua"
      ? `Створіть текст супровідного листа українською мовою на основі наступних даних:
    Ім'я: ${letterData.fullName}
    Професія: ${letterData.profession}
    Посада: ${letterData.position}
    Компанія: ${letterData.company}

Інструкції:
- Напишіть чітке введення, яке підкреслює вашу мотивацію та зацікавленість у вакансії (максимум 2 речення)
- Використовуйте професійну ділову українську мову
- Пишіть від першої особи
- Зосередьтеся на тому, чому ви підходите для цієї ролі, підкреслюючи ваші сильні сторони та досягнення
- Уникайте зайвих деталей, фокусуйтеся на ключових моментах, які вас виділяють
- Використовуйте активні дієслова
Вкладіться в обсяг 50 слів, але не більше ніж на пів сторінки.

Приклад формату:
"Досвідчений [посада] з глибоким розумінням [ключова галузь або сфера]. Спеціалізуюсь на [основні досягнення або навички], маю значний досвід у [конкретні завдання або проекти], що дозволяє мені ефективно [як саме це застосовуєте для ролі]. Шукаю можливість [яка мета або прагнення]."

Згенеруйте професійний супровідний лист за цими інструкціями, дотримуючись норм сучасної української ділової мови:`
      : `Create a text for a cover letter with the following details:
    Name: ${letterData.fullName}
    Profession: ${letterData.profession}
    Position: ${letterData.position}
    Company: ${letterData.company}

Instructions:
- Write a clear introduction that emphasizes your motivation and interest in the position (maximum 2 sentences)
- Use professional business Ukrainian language
- Write in the first person
- Focus on why you are a good fit for the role, highlighting your strengths and achievements
- Avoid unnecessary details, focusing on the key points that make you stand out
- Use active verbs
Keep the text to 50 words, but no more than half a page

Example format:
"Experienced [position] with a deep understanding of [key industry or field]. Specializing in [key achievements or skills], I have significant experience in [specific tasks or projects], which allows me to effectively [how you apply this for the role]. I am seeking an opportunity to [what you aim to achieve]."

Generate a professional cover letter following these instructions, adhering to the norms of modern Ukrainian business language:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Error generating the text with Gemini:", error);
    throw new Error("Failed to generate the text");
  }
}
