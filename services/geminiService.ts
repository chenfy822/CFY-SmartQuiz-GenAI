import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, QuestionType } from "../types";

const parseFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const generateQuestionBank = async (
  file: File, 
  title: string
): Promise<Question[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Data = await parseFileToBase64(file);

  const responseSchema: Schema = {
    type: Type.ARRAY,
    description: "List of questions extracted from the document",
    items: {
      type: Type.OBJECT,
      properties: {
        text: {
          type: Type.STRING,
          description: "The question stem/text.",
        },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The list of possible answer choices.",
        },
        correctIndices: {
          type: Type.ARRAY,
          items: { type: Type.INTEGER },
          description: "The indices (0-based) of the correct options.",
        },
        type: {
          type: Type.STRING,
          enum: ["single", "multiple"],
          description: "Whether the question is single choice or multiple choice.",
        },
        explanation: {
          type: Type.STRING,
          description: "A detailed explanation of why the answer is correct.",
        },
      },
      required: ["text", "options", "correctIndices", "type", "explanation"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      // using gemini-3-pro-preview for better reasoning on document structure
      model: "gemini-3-pro-preview", 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data,
            },
          },
          {
            text: `分析附件文档并提取所有考试题目。
            忽略目录、页眉或页脚。
            对于每道题，识别题干、选项、正确答案，并提供有助于理解的解析。
            输出符合 Schema 的纯 JSON 格式。`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    if (!response.text) {
      throw new Error("Gemini 未返回数据。");
    }

    const rawQuestions = JSON.parse(response.text);

    // Map to our internal type and add IDs
    return rawQuestions.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      number: index + 1,
      text: q.text,
      options: q.options,
      correctIndices: q.correctIndices,
      type: q.type === 'multiple' ? QuestionType.Multiple : QuestionType.Single,
      explanation: q.explanation || "暂无解析。",
    }));

  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw new Error("提取题目失败。请确保文件是可读的 PDF 或 Word 文档。");
  }
};