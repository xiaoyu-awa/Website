import Link from "next/link";
import Image from 'next/image';

export default function ArticleCard(data: any) {
    data = data.data
    return (
        <article className="flex w-full backdrop-brightness-110 text-c rounded-lg overflow-auto hover:shadow">
            <Link href={`/blog/${data.filepath}`} className="flex flex-grow">
                <div className="flex flex-col gap-3 justify-between px-8 py-6 flex-grow">

                    <span className="text-c font-bold text-2xl">
                        {data.frontmatter.title}
                    </span>

                    <div className="text-c-s">
                        {data.frontmatter.excerpt}
                    </div>

                    <div className="text-c-s">
                        <span className="border rounded-full px-2 py-1.5 mr-3 inline-flex gap-2">
                            <Image
                                src={"/blog/calendar.svg"}
                                alt={`calendar`}
                                width={24}
                                height={24}
                            />
                            <time dateTime={data.frontmatter.date?.toISOString()}>
                                {data.frontmatter.date?.toISOString().slice(0, 10)}
                            </time>
                        </span>
                    </div>

                </div>
            </Link>
        </article>
    );
}