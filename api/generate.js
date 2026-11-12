import OpenAI from "openai";

// ตารางแปลงตัวเลือกของลูกค้า -> Prompt ที่ส่งให้ GPT
const PROMPT_MAP = {
  concept: {
    ugc: "realistic UGC style photo, like taken by a real customer with a phone, natural and authentic",
    cartoon: "cute cartoon illustration style, soft colors, playful",
    model: "professional model holding and presenting the product, studio fashion photography",
    ads: "professional advertising product photo, premium commercial shot",
    lifestyle: "lifestyle photo, product placed in a real life scene, natural context"
  },
  style: {
    minimal: "clean minimal white background, soft daylight, simple and clean",
    studio: "professional studio lighting, clean studio background, sharp product focus",
    luxury: "luxury dark background with gold accents, premium elegant feel",
    cute: "bright pastel colors, cute fresh and cheerful mood",
    cafe: "natural cafe background, warm sunlight, cozy atmosphere",
    vintage: "vintage film look, warm tones, nostalgic"
  },
  ratio: {
    "1:1": "1024x1024",
    "4:5": "1024x1536",
    "9:16": "1024x1536",
    "16:9": "1536x1024"
  }
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "ใช้ POST เท่านั้น" });

  try {
    const { imageBase64, ratio, concept, style, apiKey, licenseKey } = req.body || {};

    if (!licenseKey) return res.status(403).json({ error: "กรุณาใส่ License Key" });
    if (!apiKey) return res.status(400).json({ error: "กรุณาใส่ OpenAI API Key" });
    if (!imageBase64) return res.status(400).json({ error: "กรุณาอัปโหลดรูปสินค้า" });

    // DEMO License สำหรับเทส - ของจริงให้เปลี่ยนไปเช็คกับ Supabase
    const validLicenses = ["DEMO-390"];
    if (!validLicenses.includes(licenseKey)) {
      // ถ้าจะต่อ Supabase ให้เช็คตรงนี้
      // ตอนนี้อนุญาตให้ License ที่ขึ้นต้นด้วย AI- ผ่านได้เพื่อเทส
      if (!licenseKey.startsWith("AI-") && licenseKey !== "DEMO-390") {
        return res.status(403).json({ error: "License Key ไม่ถูกต้อง" });
      }
    }

    const conceptText = PROMPT_MAP.concept[concept] || PROMPT_MAP.concept.ugc;
    const styleText = PROMPT_MAP.style[style] || PROMPT_MAP.style.minimal;
    const size = PROMPT_MAP.ratio[ratio] || "1024x1024";

    const finalPrompt = `Edit this product photo. Keep the product exactly the same, same shape, same logo, same colors, do not change the product. ${conceptText}. ${styleText}. High quality product photography, sharp, clean.`;

    const client = new OpenAI({ apiKey });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: finalPrompt,
      image: imageBase64,
      size: size,
      n: 4,
    });

    return res.status(200).json({
      success: true,
      images: result.data,
      promptUsed: finalPrompt,
      costNote: "ค่าใช้จ่ายหักจากบัญชี OpenAI ของคุณเอง"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "เจนรูปไม่สำเร็จ: " + (err.message || "ลองใหม่อีกครั้ง"), detail: String(err) });
  }
}
