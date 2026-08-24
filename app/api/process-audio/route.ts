import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';
import { saveNewMemory } from '@/lib/serverStore';

// Initialize the Gemini SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = 'gemini-3.6-flash';

const memorySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A short, descriptive title for the knowledge shared." },
    summary: { type: Type.STRING, description: "A summary of the experience or lesson." },
    category: { type: Type.STRING, description: "The broad category, e.g. Automotive Repair, Carpentry, Software Engineering." },
    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Relevant tags." },
    procedure: {
      type: Type.ARRAY,
      description: "Step-by-step instructions if a procedure was described.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.INTEGER },
          instruction: { type: Type.STRING },
          note: { type: Type.STRING }
        }
      }
    },
    expertTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Expert tips shared in the recording." },
    commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Common mistakes to avoid." },
    tools: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tools or materials mentioned." },
    story: { type: Type.STRING, description: "Any personal story or anecdote mentioned." },
    transcript: { type: Type.STRING, description: "The verbatim transcript of the audio recording." },
    expertName: { type: Type.STRING, description: "The name of the person being interviewed, if provided." },
    expertRole: { type: Type.STRING, description: "The profession, role, or title of the person being interviewed, if provided." },
    expertExperience: { type: Type.INTEGER, description: "The number of years of experience the person has, if provided." }
  },
  required: ["title", "summary", "category", "tags", "transcript", "expertName", "expertRole", "expertExperience"]
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;
    const expertName = formData.get('expertName') as string || 'Anonymous Expert';
    const expertRole = formData.get('expertRole') as string || 'Practitioner';
    const category = formData.get('category') as string || 'Uncategorized';
    
    if (!audioFile) {
      return NextResponse.json({ success: false, error: 'No audio file provided' }, { status: 400 });
    }

    // Convert audio file to Base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    const prompt = `You are an expert archivist. Listen to the following spoken account.
Please perform three tasks:
1. Provide a faithful, verbatim transcript of what was spoken. Do not summarize the transcript. Preserve the speaker's actual wording as accurately as possible.
2. Extract the interviewee's identity, including their name, role/profession, and years of experience.
3. Extract the structured knowledge based ONLY on the recording. Do not invent skills, experience, or facts. If a field is not supported by the recording, leave it empty or omit it.`;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: audioFile.type || 'audio/webm',
                data: base64Data
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: memorySchema,
        temperature: 0.1 // Low temperature for more faithful extraction
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini");
    }

    const structuredData = JSON.parse(resultText);

    // Persist to data/db.json
    const processedMemory = await saveNewMemory({
      title: structuredData.title,
      summary: structuredData.summary,
      category: category !== 'Uncategorized' ? category : structuredData.category,
      tags: structuredData.tags,
      procedure: structuredData.procedure,
      expertTips: structuredData.expertTips,
      commonMistakes: structuredData.commonMistakes,
      tools: structuredData.tools,
      story: structuredData.story,
      transcript: structuredData.transcript,
      expertId: 'user-expert-' + expertName.toLowerCase().replace(/\s+/g, '-'),
      expertName: expertName, 
      expertRole: expertRole,
      expertExperience: structuredData.expertExperience || 0,
      duration: '00:00', // We can calculate real duration if needed
    });

    return NextResponse.json({
      success: true,
      message: 'Memory extracted and preserved successfully',
      data: processedMemory
    });
  } catch (error: any) {
    console.error('Error processing audio:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process oral account' },
      { status: 500 }
    );
  }
}
