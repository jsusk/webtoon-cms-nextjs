import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import "@fortawesome/fontawesome-free/js/all";
import { getWebtoonChapters, getWebtoonChapterData  } from '../../lib/chapters_strapi'

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

export default function Chapter1({ chapterData }) {
    return (
        <>
        <Head>
            <title>chapterData.Title</title>
        </Head>

        <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item">Kukulkan's Journey</a>
                </Link>
                <div className="navbar-item">
                        <p>{chapterData.title}</p>
                </div>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>
        <div className="section webcomic-start">
        </div>
        <div className="section pl-3 pr-0">
            <div className="container">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter ">
                        <div className="tile is-ancestor">
                            <div className="tile is-full is-vertical is-parent">
                            {chapterData.ContentImage.map( (image) => (
                                <div className="tile">
                                    <Image
                                        id={image.id}
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}// Route of the image file
                                        height={image.height} // Desired size with correct aspect ratio
                                        width={image.width} // Desired size with correct aspect ratio
                                        alt={image.alternativeText}
                                        className="image is-3by5"
                                        priority={true}
                                    />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
  