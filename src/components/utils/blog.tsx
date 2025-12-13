import fs from 'fs'
import path from "path"
import matter from "gray-matter";

export function getBlogData(blogName: string) {
    const blog = fs.readFileSync(path.join(process.cwd(), 'blogs', blogName), 'utf-8')

    const { content, data } = matter(blog);
    return {
        content,
        frontmatter: data,
    };
}

export function getBlogs() {
    const filePath = path.join(process.cwd(), 'blogs');
    const blogs: {filepath: string; content: string; frontmatter: { [key: string]: any; }; }[] = [];
    try {
        const files = fs.readdirSync(filePath);
        files.forEach(function (filename) {
            const filedir = path.join(filePath, filename);
            const stats = fs.statSync(filedir);
            if (stats.isFile()) {
                var blogData = getBlogData(filename);
                blogs.push({filepath: filename, content: blogData.content, frontmatter: blogData.frontmatter});
            }
        });
        console.log(blogs)
        return blogs;
    } catch (err) {
        console.error("读取博客文件夹或文件错误:", err);
        throw err;
    }
}