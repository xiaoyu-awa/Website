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
        return blogs.toReversed();
    } catch (err) {
        throw err;
    }
}