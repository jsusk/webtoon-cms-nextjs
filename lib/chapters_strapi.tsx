export async function getWebtoonData() 
{

    const webtoonsUrl = `${process.env.STRAPI_URL}/webtoons`;
    const webtoon = await fetch(webtoonsUrl)
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

export async function getAllWebtoons() 
{

    const webtoonsUrl = `${process.env.STRAPI_URL}/webtoons`;
    const webtoon = await fetch(webtoonsUrl)
    const AllWebtoons = await webtoon.json();


    if(!AllWebtoons)
    {
        return {
            notFound: true
        }
    }

    return AllWebtoons;

}



export async function getWebtoonDataWithId(webtoonId) 
{

    const webtoonsUrl = `${process.env.STRAPI_URL}/webtoons?WebtoonSEOURL=${webtoonId}`;
    const webtoon = await fetch(webtoonsUrl)
    const kukulkanComic = await webtoon.json();


    if(!kukulkanComic)
    {
        return {
            notFound: true
        }
    }

    return kukulkanComic[0];

}


export async function getWebtoonChapters() 
{
    const webtoonList = await getAllWebtoons();
    const allChapters = webtoonList.flatMap(webtoon => {
      return webtoon.chapters
    }) 

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

  let chaptersSeoList = allChapters.map(chapter => {
    return {
      params: {
        SEOUrl: chapter.SEOUrl
      }
    }
  });

  return chaptersSeoList;
}

export async function getWebtoonByWebtoonId(webtoonId) 
{
  const webtoonsUrl = `${process.env.STRAPI_URL}/webtoons/${webtoonId}`;
  const webtoon = await fetch(webtoonsUrl)
  const kukulkanComic = await webtoon.json();

  return kukulkanComic;
}

export async function getAllWebtoonsIds() 
{

    const webtoonsUrl = `${process.env.STRAPI_URL}/webtoons`;
    const webtoon = await fetch(webtoonsUrl)
    const kukulkanComic = await webtoon.json();

    if(!kukulkanComic)
    {
        return {
            notFound: true
        }
    }

    return kukulkanComic.map(webtoon => {
      return {
        params: {
          WebtoonId: webtoon.WebtoonSEOURL
        }
      }
    })
}

export async function getWebtoonChapterData(SEOUrl) 
{
    const chapter = await fetch(`${process.env.STRAPI_URL}/chapters?SEOUrl=${SEOUrl}`);
    const chapter_data_array = await chapter.json()
    const chapter_data = chapter_data_array[0]
    chapter_data.Panels = chapter_data.Panels.sort((a, b) => a.name.localeCompare(b.name, 'en', {numeric: true, ignorePunctuation: true}))
    if(!chapter_data)
    {
        return {
            notFound: true
        }
    }

    //Get Previous and Next Chapter Data
    const parentWebtoonData = await getWebtoonByWebtoonId(chapter_data.webtoon.id);
    const allWebtoonChapters = parentWebtoonData.chapters;
    const sortedChapters = allWebtoonChapters.sort((a,b) => a.created_at.localeCompare(b.created_at))
    const findIndex = sortedChapters.findIndex(chapter => chapter.id == chapter_data.id);

    
    chapter_data.PreviousChapter = findIndex > 0 ? sortedChapters[findIndex-1].SEOUrl : null;
    chapter_data.NextChapter = findIndex < sortedChapters.length - 1 ?  sortedChapters[findIndex + 1].SEOUrl : null;
    chapter_data.WebtoonSEOURL = parentWebtoonData.WebtoonSEOURL;

    return chapter_data;

}