import type { Metadata } from 'next'
import './globals.css'
import 'primeicons/primeicons.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App as AntdApp } from 'antd'

export const metadata: Metadata = {
  metadataBase: new URL('https://congthien-ngocnhi.vercel.app'),
  title: 'Thiệp cưới Công Thiện ❤️ Ngọc Nhi',
  description: 'Trân trọng kính mời quý khách đến chung vui và chứng kiến khoảnh khắc hạnh phúc nhất trong ngày trọng đại của Công Thiện & Ngọc Nhi. Sự hiện diện của quý vị là niềm vinh hạnh lớn lao cho gia đình chúng tôi!',
  openGraph: {
    title: 'Thiệp cưới Công Thiện ❤️ Ngọc Nhi',
    description: 'Trân trọng kính mời quý khách đến chung vui và chứng kiến khoảnh khắc hạnh phúc nhất trong ngày trọng đại của Công Thiện & Ngọc Nhi. Sự hiện diện của quý vị là niềm vinh hạnh lớn lao cho gia đình chúng tôi!',
    url: 'https://congthien-ngocnhi.vercel.app/',
    siteName: 'Thiệp cưới Công Thiện & Ngọc Nhi',

    locale: 'vi_VN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;600;700&family=Lavishly+Yours&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&family=Great+Vibes&display=swap&subset=latin,vietnamese"
        />
      </head>
      <body className="bg-gray-50">
        <AntdRegistry>
          <ConfigProvider theme={{
            token: {
              fontFamily: '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              colorPrimary: '#8B2635',
            },
          }}>
            <AntdApp>
                {children}
            </AntdApp>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
