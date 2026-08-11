import Template1 from '@/components/wedding-templates/Template1';

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
      venue: 'Tư gia',
      address: 'SN 311, Ấp kinh 8B, Xã Thạnh Đông, Tỉnh An Giang',
    },
    mapUrl: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9993242268065!2d105.29097746630075!3d10.016913525308905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0bb941534cb19%3A0x84f55454fa4f60dd!2sGiu%20Duc%20Church!5e0!3m2!1sen!2sus!4v1786362107894!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
    events: [
      { time: '09:00', title: 'Thánh Lễ Hôn Phối' },
      { time: '11:00', title: 'Khai Tiệc' },
    ],
    ceremony: {
      title: 'Hôn Lễ Cử Hành Vào Lúc',
      time: '09:00',
      venue: 'THÁNH ĐƯỜNG GIÁO XỨ GIU ĐỨC – KINH 8B',
    },
    invitationMsg: 'Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.',
    parents: {
      groomFather: 'Giuse Trần Công Thạnh',
      groomMother: 'Maria Trần Thị Ánh Nguyệt',
      brideFather: 'Phêrô Phạm Văn Hoàng',
      brideMother: 'Maria Nguyễn Thị Kim Ánh',
    },
    groomInfo: {
      name: 'Giuse Trần Công Thiện',
      fatherName: 'Giuse Trần Công Thạnh',
      motherName: 'Maria Trần Thị Ánh Nguyệt',
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

export default function Home({
  searchParams,
}: {
  searchParams: { guestName?: string }
}) {
  const templateData = getWeddingData() as any;
  
  templateData.guestName = searchParams.guestName || 'Quý khách';

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
        <Template1 weddingData={templateData} />
    </main>
  );
}
