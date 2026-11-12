AI Product Studio - หลังบ้านสำหรับต่อ GPT (OpenAI API)
======================================================

ไฟล์ในโฟลเดอร์นี้:
- api/generate.js = สมอง เจนรูป 4 รูปด้วย GPT
- api/check-license.js = เช็ค License 390.-
- package.json / vercel.json = ไฟล์ตั้งค่า (ไม่ต้องแตะ)

วิธีติดตั้งแบบไม่ต้องเขียนโค้ด (10 นาที)
----------------------------------------
1. เข้า github.com สมัครฟรี -> กด New repository -> ตั้งชื่อ ai-product-studio-backend -> กด Create
2. กดปุ่ม Add file -> Upload files -> ลากไฟล์ทั้งหมดในโฟลเดอร์นี้ใส่ -> กด Commit
3. เข้า vercel.com สมัครฟรี -> กด Add New -> Project -> เลือก repo ที่เพิ่งสร้าง -> กด Deploy
4. รอ 1-2 นาที จะได้ลิงก์ https://ai-product-studio-backend-xxx.vercel.app
5. เอาลิงก์นั้นไปใส่ในหน้าบ้าน ตรงปุ่มเจนรูป: fetch("https://.../api/generate")

วิธีเทส
-------
- License: DEMO-390
- OpenAI API Key: เอาจาก platform.openai.com -> API Keys -> Create new secret key
- ต้องเติมเงิน OpenAI $5 ก่อนถึงจะเจนได้จริง

หมายเหตุ:
- API Key ของลูกค้า จะไม่ถูกเก็บไว้ในหลังบ้าน จะใช้เจนครั้งนั้นแล้วทิ้ง
- ค่าเจนหักจากบัญชี OpenAI ของลูกค้าเอง ไม่เกี่ยวกับเรา
