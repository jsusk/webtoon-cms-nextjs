export async function getWebtoonData() 
{
    const webtoon = await fetch('http://127.0.0.1:1337/webtoons')
    const data = await webtoon.json();
    //console.log(data)

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