export async function generateMetadata({ }) {
  return {
    title: "主页 - 筱雨の博客",
    description: "笨蛋筱雨的博客主页",
    openGraph: {
      title: "主页 - 筱雨の博客",
      description: "笨蛋筱雨的博客主页",
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
