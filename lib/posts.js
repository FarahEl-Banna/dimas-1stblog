import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
// postDirectory = "nextjs-blog\posts"


export function getSortedPostsData() {
    //Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');
  
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
  
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
  
      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
   // return {process:process.cwd(),directory:postsDirectory}
  }

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    //fileNames =["pre-rendering.md","ssg-ssr.md"] 
    // all the file names (strings) in the specified directory "nextjs-blog\posts"
    
    return fileNames.map(fileName =>{
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      }
    })
    // the function must returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  }

export async function getPostData(id){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    //fullPath = `nextjs-blog\posts\${id}.md`;
    const fileContents = fs.readFileSync(fullPath, 'utf8');// reading the file

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
}

// import fsPromises from 'fs';
// import path from 'path';
//   export async function getStaticDataFromJson() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const filePath = path.join(process.cwd(), 'dbjson/movies.json');
//     const jsonData = await fsPromises.readFile(filePath);
//     const objectData = JSON.parse(jsonData);
//     return objectData;
//   }