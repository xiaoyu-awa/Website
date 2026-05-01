import BlogLayout from '@/components/blog/BlogLayout';
import Image from 'next/image';

import Markdown from 'markdown-it'
import { createMathjaxInstance, mathjax } from "@mdit/plugin-mathjax";
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';

import { getBlogData } from '@/components/utils/blog';

// markdown-it的小bug修复
declare global {
  function isSpace(code: number): boolean;
}
globalThis.isSpace = function(code: number): boolean {
  return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
};

//变量
declare global {
  var content: any;
  var frontmatter: any;
}

//meta信息
export async function generateMetadata({ }) {
  return {
    title: global.frontmatter.title + " - 筱雨の博客",
    description: "[" + global.frontmatter.tags  + "]" + global.frontmatter.excerpt,
    openGraph: {
      title: global.frontmatter.title + " - 筱雨の博客",
      description: "[" + global.frontmatter.tags  + "]" + global.frontmatter.excerpt,
      images: [
        {
          url: "/avatar.jpg",
        },
      ],
    },
  };
}

export default async function Blog({params,}: {  params: Promise<{ blog: string }>}) {
    const { blog } = await params
    var { content,frontmatter } = getBlogData(blog)
    //全局变量
    global.content = content;
    global.frontmatter = frontmatter;

    // markdown-it渲染
    const mathjaxInstance = await createMathjaxInstance({output: "svg"});
    var md = new Markdown({
        html: true,
        linkify: true,
        typographer: true,

        highlight: function (str, lang) {
            try {
                return hljs.highlightAuto(str).value;
            } catch (__) {
                return '代码高亮出现问题！';
            }
        }
    }).use(mathjax, mathjaxInstance);

    var text = md.render(content)



    return (
        <BlogLayout
            leftContent={
                <div>
                    <div>
                        <div>简介：<br/>
                            <span className='text-sm'>{frontmatter.excerpt}</span>
                        </div>
                        <hr className='m-2' />
                        <div>文章标签：<br/>
                            <span className='text-sm'>{frontmatter.tags}</span>
                        </div>
                    </div>
                </div>
            }
            mainContent={
                <div>
                    <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
                    <div className="text-c-s">
                        <span className="border rounded-full px-2.5 py-1 mr-2.5 inline-flex gap-2">
                            <Image 
                                src={"/blog/calendar.svg"}
                                alt={`calendar`}
                                width={24}
                                height={24}
                            />
                            <time dateTime={frontmatter.date?.toISOString()}>
                                {frontmatter.date?.toISOString().slice(0, 10)}
                            </time>
                        </span>
                    </div>
                    <hr className='m-4'/>
                    <div className="[&_svg]:inline prose max-w-none leading-normal prose-hr:m-4" dangerouslySetInnerHTML={{ __html: text }}></div>
                    <style>
                        {mathjaxInstance?.outputStyle()}
                    </style>
                </div>
            }
        />
    );
}