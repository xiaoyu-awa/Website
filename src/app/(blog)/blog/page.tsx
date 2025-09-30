import ArticleCard from '@/components/blog/ArticleCard';
import BlogLayout from '@/components/blog/BlogLayout';

import { getBlogData, getBlogs } from '@/components/utils/blog';

export default function Home() {
    return (
        <BlogLayout
            leftContent={
                <div>
                    左侧内容 WIP:内容tag筛选与搜索
                </div>
            }
            mainContent={
                <div className='grid gap-4'>
                    {getBlogs().map((blog, index) => (
                        <ArticleCard 
                            key={index}
                            data={blog.frontmatter}
                        />
                    ))}
                </div>
            }
        />
    );
}
