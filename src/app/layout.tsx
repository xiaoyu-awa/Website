export async function generateMetadata({ }) {
  return {
    title: "筱雨の主页",
    description: "笨蛋筱雨的主页",
    openGraph: {
      title: "筱雨の主页",
      description: "笨蛋筱雨的主页",
      images: [
        {
          url: "/index/avatar.jpg",
        },
      ],
    },
  };
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="zh-CN">
            <body>{children}</body>
        </html>
    );
}
