require('dotenv').config();
const { OpenAI } = require('openai');

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai'
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const generateResponse = async (prompt, conversationHistory = [], retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const messages = [
                {
                    role: 'system',
                    content: `You are an intelligent HR Assistant for Optum Healthcare.
Your role is to help employees find accurate information about HR policies, benefits, leave, compliance, and workplace guidelines.
Always base your answers strictly on the provided policy context.
If the answer is not in the provided context, clearly state that you don't have that information and suggest contacting HR directly at hr@optum.com.
Be professional, empathetic, and concise.
Format your responses clearly with bullet points or numbered lists where appropriate.`
                },
                ...conversationHistory,
                {
                    role: 'user',
                    content: prompt
                }
            ];

            const response = await client.chat.completions.create({
                model: 'gemini-2.0-flash',
                messages,
                temperature: 0.2,
                max_tokens: 1000
            });

            return response.choices[0].message.content;

        } catch (error) {
            console.error(`[Gemini Error] Attempt ${attempt}/${retries}:`, error.message);

            // If rate limited and retries left, wait and retry
            if (error.status === 429 && attempt < retries) {
                const waitTime = attempt * 10000; // 10s, 20s, 30s
                console.log(`⏳ Rate limited. Waiting ${waitTime/1000}s before retry...`);
                await sleep(waitTime);
                continue;
            }

            throw new Error(`LLM service error: ${error.message}`);
        }
    }
};

module.exports = { generateResponse };