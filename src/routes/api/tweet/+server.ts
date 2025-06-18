import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';
import fs from 'fs';
import path from 'path';

// ต้องใช้ node adapter เพื่อเขียนไฟล์ลง disk ได้
export async function POST({ request }) {
  const formData = await request.formData();

  const content = formData.get('content')?.toString() ?? '';
  const delay = parseInt(formData.get('delay') || '0');
  const reposts = formData.get('reposts') === 'true';

  const imageFile = formData.get('image');

  let imagePath = null;

  if (imageFile && imageFile instanceof File) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadDir = 'static/uploads';
    const fileName = Date.now() + '_' + imageFile.name;
    const filePath = path.join(uploadDir, fileName);

    // ensure directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    fs.writeFileSync(filePath, buffer);
    imagePath = `/uploads/${fileName}`; // path to access image via static
  }

  const db = await getDb();
  const result = await db.collection('posts').insertOne({
    content,
    delay,
    reposts,
    imagePath, // เก็บ path รูปไว้
    createdAt: new Date()
  });

  return json({ status: 'ok', id: result.insertedId });
}
