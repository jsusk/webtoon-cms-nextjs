import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import "@fortawesome/fontawesome-free/js/all";
import { getWebtoonChapters, getWebtoonChapterData  } from '../../lib/chapters_strapi'
import ChapterNavbar from '../../components/chapterNavbar'
export async function getStaticPaths() {
    const paths = await getWebtoonChapters()

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const chapterData = await getWebtoonChapterData(params.SEOUrl)
  
    return {
        props: {
            chapterData
        }
    }
}

export default function Chapter({ chapterData }) {
    const router = useRouter();

    return (
        <>
        <Head>
        <meta charSet="utf-8"/>
            <title>{chapterData.Title}</title>
            <script async defer data-domain="kukulkansjourney.info" src="https://plausible.io/js/plausible.js"></script>
        </Head>
        <ChapterNavbar chapterData = {chapterData}></ChapterNavbar>
        <div className="section webcomic-start">
        </div>
        <div className="section pl-3 pr-0">
            <div className="container">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter ">
                        <div className="tile is-ancestor">
                            <div className="tile is-full is-vertical is-parent">
                                {chapterData.Panels.slice(0,3).map( (image) => (
                                    <div className="tile">
                                        <Image
                                            id={image.id}
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}// Route of the image file
                                            height={image.height} // Desired size with correct aspect ratio
                                            width={image.width} // Desired size with correct aspect ratio
                                            alt={image.alternativeText}
                                            className="image is-3by5"
                                            unoptimized={true}
                                            priority={true}
                                        />
                                    </div>
                                ))}
                            
                                    
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-12">
                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <Link href={`/chapters/${chapterData.PreviousChapter }`}>
                                    <button className="button is-info is-pulled-right is-medium" disabled={!chapterData.PreviousChapter}>Previous Chapter</button>
                                </Link>
                            </p>
                            <p className="control">
                                <Link href={`/chapters/${chapterData.NextChapter }`}>
                                    <button className="button is-primary is-pulled-left is-medium" disabled={!chapterData.NextChapter}>Next Chapter</button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
  