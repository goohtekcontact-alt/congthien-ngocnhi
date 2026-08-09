import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No files received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');
    
    const uploadDir = path.join(process.cwd(), 'src/upload');
    
    // Try to create the directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (_e) {
      // Ignore if directory exists
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the URL that can be used to access this image
    return NextResponse.json({ 
      success: true, 
      url: `/api/images/${filename}` 
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
