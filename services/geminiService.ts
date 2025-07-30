import { GoogleGenAI, Type } from "@google/genai";

// Ensure API_KEY is available in the environment.
// In a real application, this should be handled securely.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will prevent the app from running without the key.
  // The error should be caught during app initialization.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePraisePoem = async (name: string, praise: string): Promise<string> => {
  if (name.length < 2 || name.length > 5) {
    throw new Error("이름은 2자 이상, 5자 이하로 입력해주세요.");
  }

  // A clear, direct prompt for generating the acrostic poem.
  const prompt = `'${name}'(으)로 삼행시(또는 이름 글자 수에 맞는 시)를 지어줘. 각 행은 이름의 한 글자로 시작해야 해. 전체적인 주제는 '${praise}'이고, 긍정적이고 따뜻한 칭찬의 내용으로 작성해줘.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 1,
        topK: 40,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            poem: {
              type: Type.STRING,
              description: "각 행이 줄바꿈(\\n)으로 구분된 칭찬 시"
            },
          },
          required: ["poem"],
        },
      }
    });
    
    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    
    if (!result.poem) {
        throw new Error("AI가 유효한 형식의 응답을 생성하지 못했습니다.");
    }
    return result.poem.trim();
  } catch (error) {
    console.error("Error generating poem with Gemini API:", error);
    if (error instanceof SyntaxError) {
      throw new Error("AI 응답을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
    throw new Error("칭찬 삼행시를 만드는 데 실패했어요. 잠시 후 다시 시도해주세요.");
  }
};