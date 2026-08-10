import Template1 from '@/components/wedding-templates/Template1';
import { guestMap } from '@/lib/guests';

function getWeddingData() {
  // Default data fallback if DB is empty
  return {
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
      brideMother: 'Maria Nguyễn Thị Kim Ánh',
    },
    groomInfo: {
      name: 'Giuse Trần Công Thiện',
      fatherName: 'Giuse Trần Công Thạnh',
      motherName: 'Maria Trần Thị Ánh Nguyệt (cố mẫu)',
      city: 'Tân Hội, An Giang',
      address: 'SN 174, Tổ 8, Ấp Tân Long, Xã Tân Hội, Tỉnh An Giang',
    },
    brideInfo: {
      name: 'Têrêsa Phạm Thị Ngọc Nhi',
      fatherName: 'Phêrô Phạm Văn Hoàng',
      motherName: 'Maria Nguyễn Thị Kim Ánh',
      city: 'Thạnh Đông, An Giang',
      address: 'SN 311, Ấp kinh 8B, Xã Thạnh Đông, Tỉnh An Giang',
    },
    bankInfo: [],
  };
}

export default function GuestPage({
  params,
}: {
  params: { guestSlug: string }
}) {
  const templateData = getWeddingData() as any;
  const guestName = guestMap[params.guestSlug];
  
  if (guestName) {
    templateData.guestName = guestName;
  }

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
        <Template1 weddingData={templateData} />
    </main>
  );
}
