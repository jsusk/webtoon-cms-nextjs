export async function getWebtoonData() 
{

    const webtoon = await fetch(`${process.env.STRAPI_URL}/webtoons`)
    const data = await webtoon.json();


    if(!data)
    {
        return {
            notFound: true
        }
    }

    //get first webcomic
    const kukulkanComic = data[0];

    return kukulkanComic;

}

export async function getWebtoonChapters() 
{
    const webtoon = await getWebtoonData();
    const chapters = webtoon.chapters;
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
  return chapters.map(chapter => {
    return {
      params: {
        SEOUrl: chapter.SEOUrl
      }
    }
  })
}

export async function getWebtoonChapterData(SEOUrl) 
{
    const chapter = await fetch(`${process.env.STRAPI_URL}/chapters?SEOUrl=${SEOUrl}`)
    const chapter_data_array = await chapter.json()
    const chapter_data = chapter_data_array[0]
    chapter_data.ContentImage = chapter_data.ContentImage.sort((a, b) => a.name.localeCompare(b.name, 'en', {numeric: true, ignorePunctuation: true}))
    if(!chapter_data)
    {
        return {
            notFound: true
        }
    }

    return chapter_data;

}