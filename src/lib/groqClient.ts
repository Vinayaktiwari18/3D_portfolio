// Groq API client for YAAR AI chat
// Add NEXT_PUBLIC_GROQ_API_KEY to .env.local when ready

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

const YAAR_SYSTEM_PROMPT = `You are YAAR — Vinayak Tiwari's AI assistant on his portfolio website yaar.world. Answer all questions about Vinayak naturally, like a knowledgeable and friendly companion. Keep answers short, warm, and honest. Maximum 3-4 sentences per response.

Key facts about Vinayak:
- Full name: Vinayak Tiwari
- Age: ~20, from Firozabad UP, now in Hyderabad
- Education: BCA student, Jahnavi Degree College, Narayanguda
- Founder of YAAR (AI + voice tech company)
- Location: Ameerpet, Hyderabad, India
- Email: vinayakt9639@gmail.com
- GitHub: github.com/Vinayaktiwari18
- LinkedIn: linkedin.com/in/vinayak-tiwari1809
- WhatsApp: +91 9639731624

Projects built:
1. AI Slop Detector — detects AI generated content using NLP
2. Resume Forge — AI powered resume builder
3. StyleSense AI — AI fashion recommendations
4. Emotion Music System — mood based music AI
5. YAAR — AI voice and text companion (main project)
6. SNR Chatbot — NLP conversational bot

Skills: Python, JavaScript, HTML, CSS, React, Node.js, AI APIs, Voice interfaces, NLP, Edge-TTS, Google Speech API, OpenRouter, Groq

Looking for: internships, freelance projects, collaborations in AI and voice applications

Personality: curious, fast learner, product thinker, honest, ships real working projects

Goal: Build YAAR Technologies in Hyderabad — AI systems, voice interfaces, smart automation

If asked about hiring: be genuinely helpful and positive but honest about his level.
If asked something you don't know: say so simply.
Always be friendly and conversational.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function sendMessage(
  messages: ChatMessage[]
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY

  // No API key yet — return smart fallback
  if (!apiKey || apiKey === 'your_groq_key_here') {
    return getFallbackResponse(
      messages[messages.length - 1]?.content ?? ''
    )
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: YAAR_SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.'

  } catch (error) {
    console.error('Groq API error:', error)
    return getFallbackResponse(
      messages[messages.length - 1]?.content ?? ''
    )
  }
}

// Smart fallback responses when no API key
function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('hire') || msg.includes('work')) {
    return "Vinayak is actively looking for internships and freelance projects in AI and voice tech! Reach out at vinayakt9639@gmail.com or WhatsApp +91 9639731624 🚀"
  }
  if (msg.includes('project') || msg.includes('build')) {
    return "Vinayak has built AI Slop Detector, Resume Forge, StyleSense AI, Emotion Music System and YAAR — all real working projects. Check github.com/Vinayaktiwari18 for source code!"
  }
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack')) {
    return "Vinayak works with Python, JavaScript, React, AI APIs, voice interfaces and NLP. He specializes in building AI-powered applications from scratch."
  }
  if (msg.includes('contact') || msg.includes('reach') || msg.includes('email')) {
    return "Best ways to reach Vinayak: Email vinayakt9639@gmail.com, WhatsApp +91 9639731624, or LinkedIn linkedin.com/in/vinayak-tiwari1809 😊"
  }
  if (msg.includes('yaar') || msg.includes('company')) {
    return "YAAR is Vinayak's AI company vision — building voice interfaces, AI systems and smart automation tools. yaar.world is the home base!"
  }
  if (msg.includes('who') || msg.includes('vinayak') || msg.includes('about')) {
    return "Vinayak Tiwari is a BCA student from Hyderabad building real AI products. Founder of YAAR, he's passionate about voice AI and human-computer interaction. Curious, fast learner, ships real stuff!"
  }

  return "Hey! I'm YAAR — Vinayak's AI assistant. Ask me about his projects, skills, or how to work with him! 👋"
}