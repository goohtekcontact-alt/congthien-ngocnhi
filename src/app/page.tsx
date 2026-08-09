import Template1 from '@/components/wedding-templates/Template1';
import dbConnect from '@/lib/db';
import Wedding from '@/lib/models/Wedding';

export const revalidate = 0; // Disable cache for this page so it updates immediately when DB changes

async function getWeddingData() {
  await dbConnect();
  const wedding = await Wedding.findOne({ slug: 'default' }).lean();
  
  if (wedding) {
    return JSON.parse(JSON.stringify(wedding));
  }
  
  // Default data fallback if DB is empty
  return {
    editMode: false,
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
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { guestName?: string }
}) {
  const templateData = await getWeddingData();
  
  if (searchParams.guestName) {
    templateData.guestName = searchParams.guestName;
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
        <Template1 weddingData={templateData} />
    </main>
  );
}
