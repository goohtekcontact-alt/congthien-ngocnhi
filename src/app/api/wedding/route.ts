export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Wedding from '@/lib/models/Wedding';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // For now we'll just use a single document with slug "default"
    let wedding = await Wedding.findOne({ slug: 'default' });
    
    if (!wedding) {
      // Create default if not exists
      wedding = await Wedding.create({
        slug: 'default',
        weddingType: 'bride',
        groomName: 'Giuse Trần Công Thiện',
        brideName: 'Têrêsa Phạm Thị Ngọc Nhi',
        groomShort: 'Công Thiện',
        brideShort: 'Ngọc Nhi',
        date: {
          dayNumber: '03',
          month: '10',
          year: '2026',
          time: '11:00',
        },
        location: {
          name: 'Tư gia',
          address: 'SN 311, Ấp kinh 8B, Xã Thạnh Đông, Tỉnh An Giang',
        },
        events: [
          { time: '09:00', title: 'Thánh Lễ Hôn Phối' },
          { time: '11:00', title: 'Khai Tiệc' },
        ],
        invitationMsg: 'Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.',
        parents: {
          groomFather: 'Giuse Trần Công Thạnh',
          groomMother: 'Maria Trần Thị Ánh Nguyệt (cố mẫu)',
          brideFather: 'Phêrô Phạm Văn Hoàng',
          brideMother: 'Maria nguyễn Thị Kim Ánh',
        },
        bankInfo: [],
      });
    }

    return NextResponse.json(wedding);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const wedding = await Wedding.findOneAndUpdate(
      { slug: 'default' },
      { $set: data },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(wedding);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
