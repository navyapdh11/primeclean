export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() })),
  context: z.enum(['booking', 'pricing', 'services', 'general']).default('general'),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  booking: `You are PrimeClean's booking assistant. Help customers book cleaning services. Services: Standard Clean ($129), Deep Clean ($249), Move In/Out ($299), Office Clean ($199), Window Clean ($99), Carpet & Upholstery ($179). Guide them to /book to complete booking.`,
  pricing: `You are PrimeClean's pricing assistant. All prices include GST. Standard Clean $129/2hr, Deep Clean $249/4hr, Move In/Out $299/5hr, Office Clean $199/3hr, Window Clean $99/1.5hr, Carpet $179/2.5hr. Offer volume discounts for recurring bookings.`,
  services: `You are PrimeClean's services guide. We offer: Standard Clean (whole home dusting, vacuuming, mopping, bathroom/kitchen sanitization), Deep Clean (intensive top-to-bottom including inside appliances, baseboards), Move In/Out (comprehensive vacant property clean), Office Clean (desks, common areas, restrooms), Window Clean (interior/exterior, screens, tracks), Carpet & Upholstery (deep steam cleaning).`,
  general: `You are PrimeClean's friendly AI assistant. PrimeClean is a professional cleaning services platform. Customers can book cleans, manage bookings, upload before/after photos, and pay securely. Be helpful, concise, and friendly.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = chatSchema.parse(body);

    const systemPrompt = SYSTEM_PROMPTS[validated.context] || SYSTEM_PROMPTS.general;

    // Use OpenAI-compatible API if available, otherwise use built-in responses
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: systemPrompt }, ...validated.messages],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ reply: data.choices[0].message.content });
      }
    }

    // Fallback: intelligent keyword-based responses
    const lastMessage = validated.messages[validated.messages.length - 1]?.content.toLowerCase() || '';
    const reply = generateFallbackReply(lastMessage, validated.context);

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Chat unavailable' }, { status: 500 });
  }
}

function generateFallbackReply(message: string, context: string): string {
  const responses: Record<string, string[]> = {
    booking: [
      "I can help you book a clean! Choose from Standard Clean ($129), Deep Clean ($249), or Move In/Out ($299). Visit our booking page to select your date and time.",
      "Ready to book? Pick your service type, preferred date and time, and we'll handle the rest. Same-day booking is available!",
    ],
    pricing: [
      "Our pricing is transparent with no hidden fees. Standard Clean starts at $129, Deep Clean at $249. All prices include GST. Recurring bookings get 10% off!",
    ],
    services: [
      "We offer 6 cleaning services: Standard Clean, Deep Clean, Move In/Out, Office Clean, Window Clean, and Carpet & Upholstery. Each includes professional-grade equipment and vetted cleaners.",
    ],
    general: [
      "Hi! I'm the PrimeClean assistant. I can help you with booking, pricing, or learning about our services. What would you like to know?",
    ],
  };

  const options = responses[context] || responses.general;

  // Simple keyword matching
  if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
    return "Our prices: Standard Clean $129, Deep Clean $249, Move In/Out $299, Office $199, Window $99, Carpet $179. All include GST with no hidden fees!";
  }
  if (message.includes('book') || message.includes('schedule')) {
    return "To book, visit our Book page, select your service type, preferred date and time, and complete checkout. It takes just 2 minutes!";
  }
  if (message.includes('cancel') || message.includes('refund')) {
    return "Full refund with 24+ hours notice. 50% refund with 12-24 hours. No refund under 12 hours. Visit our Cancellation Policy page for details.";
  }
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! 👋 I'm here to help with cleaning services. Need help booking, pricing, or learning about our services?";
  }

  return options[Math.floor(Math.random() * options.length)];
}
