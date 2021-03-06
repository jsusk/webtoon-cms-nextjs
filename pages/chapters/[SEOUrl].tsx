import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import "@fortawesome/fontawesome-free/js/all";
import { getWebtoonChapters, getWebtoonChapterData  } from '../../lib/chapters_strapi'
import ChapterNavbar from '../../components/chapterNavbar'
import NavigationButtons from '../../components/navigationButtons'
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
                                {chapterData.Panels.map( (image, index) => (
                                    <div key={index} className="tile">
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
                        <NavigationButtons chapterData = {chapterData}></NavigationButtons>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
  