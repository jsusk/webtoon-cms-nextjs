import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import sizeOf from 'image-size'

const postsDirectory = path.join(process.cwd(), 'webcomic-chapters')

export function getWebcomicChapters() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData;
}

export function getAllWebComicChaptersIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
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
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getChapterData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  //Read all image from webcomic chapter path
  const chapterData = matterResult.data
  const chapterImageRootFolder = chapterData.image_folder_path
  const withAppendPublicFolder = `/public/${chapterImageRootFolder}`
  const webcomicChapterImageFolder = path.join(process.cwd(),withAppendPublicFolder)
  const fileNames = fs.readdirSync(webcomicChapterImageFolder)

  const fullPathName = fileNames.map( fileName => {
    const relativePath = path.join(chapterImageRootFolder, fileName)
    const absolutePath = path.join(webcomicChapterImageFolder, fileName)
    const img_seize = sizeOf(absolutePath)
    return {
      relativePath:relativePath,
      width: img_seize.width,
      height: img_seize.height
    }
  }).sort((a, b) => a.relativePath.localeCompare(b.relativePath, 'en', {numeric: true, ignorePunctuation: true}))

  // Combine the data with the id
  return {
    id,
    comic_pages : fullPathName,
    ...matterResult.data
  }
}

