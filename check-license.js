export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).json({ error: "ใช้ POST เท่านั้น" });
  const { licenseKey } = req.body || {};
  // ของจริง: ไปเช็คใน Supabase ว่า License นี้ขายไปแล้วหรือยัง
  // ตอนนี้: DEMO-390 และ AI-xxxx ใช้ได้
  const isValid = licenseKey === "DEMO-390" || (licenseKey && licenseKey.startsWith("AI-"));
  return res.status(200).json({ valid: !!isValid, licenseKey, plan: "ซื้อขาด 390 บาท" });
}
