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
      phone: '0358915420',
    },
    brideInfo: {
      name: 'Têrêsa Phạm Thị Ngọc Nhi',
      fatherName: 'Phêrô Phạm Văn Hoàng',
      motherName: 'Maria Nguyễn Thị Kim Ánh',
      city: 'Thạnh Đông, An Giang',
      address: 'SN 311, Ấp kinh 8B, Xã Thạnh Đông, Tỉnh An Giang',
      phone: '0786868855',
    },
    story1: 'Tháng 8 — tháng của những cơn mưa, cũng là tháng mở đầu cho câu chuyện tình yêu của chúng mình.\n\nChúng mình gặp nhau lần đầu tiên ở một nơi thật đặc biệt — nhà thờ, sau một Thánh lễ Chúa nhật.\n\nChẳng ai biết rằng, giữa biết bao người qua lại, cuộc gặp gỡ rất đỗi bình thường ấy lại là khởi đầu cho một hành trình thật đẹp.\n\nRồi những buổi hẹn đầu tiên cứ thế nối tiếp nhau. Và thật lạ, hầu như cuộc hẹn nào cũng có mưa.',
    story2: 'Có lẽ ông trời đã vô tình viết thêm một chút lãng mạn cho câu chuyện của chúng mình — để những ngày đầu bên nhau luôn có tiếng mưa rơi, có những đoạn đường cùng đi, và có hai người dần trở nên thân thuộc.\n\nSau hai tháng tìm hiểu, chúng mình chính thức gọi tên mối quan hệ ấy là tình yêu.\n\nTừ những buổi hẹn dưới mưa, những cuộc trò chuyện chẳng biết bao giờ mới hết, đến những ngày cùng nhau chia sẻ niềm vui, nỗi buồn và cả những điều rất nhỏ trong cuộc sống… Chúng mình nhận ra rằng, điều đẹp nhất không phải là tìm được một người hoàn hảo, mà là tìm được một người muốn cùng mình bước tiếp.\n\nVà rồi, thật trùng hợp cũng thật nhiệm màu…',
    loveQuote: 'Ngày kỷ niệm một năm chúng mình quen nhau lại chính là ngày chúng mình về chung một nhà.\n\nMột năm không quá dài, nhưng đủ để chúng mình hiểu rằng: giữa rất nhiều người trên thế giới này, chúng mình đã gặp được nhau, yêu thương nhau và chọn nhau.\n\nTừ một cuộc gặp sau Thánh lễ Chúa nhật, qua những ngày hẹn hò dưới mưa, chúng mình đã đi đến ngày hôm nay — ngày bắt đầu một hành trình mới, cùng nhau trong tình yêu và trong Chúa.\n\nCảm ơn vì tháng 8 năm ấy đã mang chúng mình đến gần nhau. Cảm ơn những cơn mưa đã trở thành ký ức thật đẹp. Và trên hết, chúng mình biết ơn Chúa vì đã cho hai trái tim gặp được nhau đúng lúc.\n\nTừ hôm nay, chúng mình không còn chỉ là hai người yêu nhau. Chúng mình là gia đình.\n\nNgọc Nhi & Công Thiện\n03-04.10.2026',
    memoryQuote: 'Và rồi, thật trùng hợp cũng thật nhiệm màu…\n\nNgày kỷ niệm một năm chúng mình quen nhau lại chính là ngày chúng mình về chung một nhà.\n\nMột năm không quá dài, nhưng đủ để chúng mình hiểu rằng: giữa rất nhiều người trên thế giới này, chúng mình đã gặp được nhau, yêu thương nhau và chọn nhau.',
    weddingQuote: 'Từ một cuộc gặp sau Thánh lễ Chúa nhật, qua những ngày hẹn hò dưới mưa, chúng mình đã đi đến ngày hôm nay — ngày bắt đầu một hành trình mới, cùng nhau trong tình yêu và trong Chúa.\n\nCảm ơn vì tháng 8 năm ấy đã mang chúng mình đến gần nhau. Cảm ơn những cơn mưa đã trở thành ký ức thật đẹp. Và trên hết, chúng mình biết ơn Chúa vì đã cho hai trái tim gặp được nhau đúng lúc.\n\nTừ hôm nay, chúng mình không còn chỉ là hai người yêu nhau. Chúng mình là gia đình.\n\nNgọc Nhi & Công Thiện\n03-04.10.2026',
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
