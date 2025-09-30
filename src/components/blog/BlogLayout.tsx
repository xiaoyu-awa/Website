export default function BlogLayout({ leftContent, mainContent }: {
    leftContent: React.ReactNode,
    mainContent: React.ReactNode
}) {
    return (
        <div className="size-full flex items-start justify-center p-2 pt-16">
            <div className="bg-[#f9fafba0] ml-4 mr-2 w-60 rounded-lg p-4 sticky top-16 shadow-xl">
                {leftContent}
            </div>
            <div className="bg-[#f9fafbc0] ml-2 min-h-full w-7/12 rounded-lg p-8 shadow-2xl backdrop-blur-sm">
                {mainContent}
            </div>
        </div>
    );
}
