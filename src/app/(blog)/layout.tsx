import Navigation from "@/components/blog/Navigation";

export async function generateMetadata({ }) {
  return {
    title: "主页 - 筱雨の博客",
    description: "笨蛋筱雨的博客主页",
    openGraph: {
      title: "主页 - 筱雨の博客",
      description: "笨蛋筱雨的博客主页",
      images: [
        {
          url: "/avatar.jpg",
        },
      ],
    },
  };
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
            <div className="w-full flex flex-col">
                <div className="fixed inset-0 bg-[url('/blog/background.jpg')] bg-no-repeat bg-center bg-cover -z-10
                                brightness-[.80]" />
                <Navigation />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
