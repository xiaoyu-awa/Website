import Link from "next/link";

export default async function NavBar() {
    return (
        <nav className="fixed top-0 left-0 w-full min-h-24 shadow bg-g-m text-c select-none z-50
                    px-4 flex flex-col sm:min-h-14 sm:flex-row sm:justify-between sm:items-stretch
                    bg-[#f9fafb30] backdrop-blur-sm">
            <div className="flex justify-center items-stretch flex-grow sm:flex-grow-0">
                <span className="px-2 flex items-center">
                    <img
                        src="/avatar.jpg"
                        alt={"avatar"}
                        width={750}
                        height={750}
                        className="w-8 h-8 rounded-full shrink-0"
                    />
                </span>
                <h1 className="px-1 flex items-center shrink-0 text-xl font-bold">
                    <Link href={`/`}>
                        筱雨awa
                    </Link>
                </h1>
            </div>
            <div className="flex justify-center items-stretch flex-grow sm:flex-grow-0">
                <Link href={`/blog`} className="px-2 flex items-center leading-none shrink-0 hover:bg-g-n hover:text-c-a">
                    主页
                </Link>
                <Link href={`/about`} className="px-2 flex items-center leading-none shrink-0 hover:bg-g-n hover:text-c-a">
                    关于
                </Link>
            </div>
        </nav>
    );
}