import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { getWebtoonDataWithId, getAllWebtoonsIds} from '../../lib/chapters_strapi'

import ComicSummary from '../../components/comicSummary'
import ComicChapters from '../../components/comicChapters'

import "@fortawesome/fontawesome-free/js/all";
import Link from 'next/link'

export async function getStaticPaths() {
    const paths = await getAllWebtoonsIds()

    return {
      paths,
      fallback: false
    }
}


export async function getStaticProps({ params }) {
  const webComicInfo = await getWebtoonDataWithId(params.WebtoonId)

  return {
    props: {
      webComicInfo,
      flights : { mailListEnable: true }
    }
  }
}

export default function Home(props) {

  let headerColor = props.webComicInfo.PageColor;
  let headerColorOrDefault = "black";

  if(headerColor && headerColor.length > 0)
  {
    headerColorOrDefault = headerColor;
  }

  console.log(headerColorOrDefault)

  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{props.webComicInfo.Title}</title>
      <script async defer data-domain="kukulkansjourney.info" src="https://plausible.io/js/plausible.js"></script>
      <script src="/js/mail.js"></script>
    </Head>
    <div className="back-layout">
      <section className={`hero is-${headerColorOrDefault} is-halfheight is-mobile`}>
        <div className="hero-head"></div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">
              {props.webComicInfo.Title}
            </p>
          </div>
        </div>
        <div className="hero-foot"></div>
      </section>
      <section className="section webcomic-cover">
          <div className="columns is-centered is-mobile">
            <div className="column is-10">
              <div className="columns is-centered">
                  <div className="box cover-box"> 
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.webComicInfo.Cover.formats.medium.url}`} // Route of the image file
                      height={450} // Desired size with correct aspect ratio
                      width={450} // Desired size with correct aspect ratio
                      alt={props.webComicInfo.Cover.alternativeText}
                      className="image is-square"
                      unoptimized={true}
                      priority={true}
                    />
                  </div>
              </div>
            </div>
          </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-8">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <ComicSummary chapters={props.webComicInfo.chapters}>{props.webComicInfo.Summary}</ComicSummary>
              </div>
            </div>
            {
              props.webComicInfo.chapters.length > 0 ? (
              <div className="columns">
                <div className="column is-6 is-offset-6">
                  <div className="columns">
                        <div className="column">
                          <div className="box chapter-list">
                            <div className="content">
                              <h2>Chapters</h2>
                            </div>
                            <ComicChapters chapters={props.webComicInfo.chapters}></ComicChapters>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
              )
              :
              (
              <></>
              )
            }
          </div>
          <div className="column is-6 is-offset-0">
            <div className="columns">
              <div className="column is-4 ">
                <div className="box">
                  <div className="content">
                    <h3>Follow us on:</h3>
                    <p>
                    <div className="field is-grouped">
                        <p className="control">
                          <Link href="https://twitter.com/KukulkanJourney">
                            <button className="button is-medium">
                              <span className="icon is-medium">
                                <i className="fab fa-twitter-square fa-lg"></i>
                                
                              </span>
                            </button>
                          </Link>
                          
                        </p>
                        <p className="control">
                          <Link href="https://www.reddit.com/r/kukulkansjourney/">
                              <button className="button is-medium">
                                <span className="icon is-medium">
                                  <i className="fab fa-reddit-square fa-lg"></i>
                                </span>
                              </button>
                            </Link>
                        </p>                        
                    </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {
            props.flights.mailListEnable ? 
            <div className="columns">
              <div className="column is-4 ">
                <div className="box">
                  <div className="ml-form-embed"
                    data-account="3197461:p9m0x7n0z5"
                    data-form="4191304:m2w7x4">
                  </div>
                </div>
              </div>
            </div> 
            :
            <></> 
          }
          </div>
        </div>
      </section>
<footer className={`footer has-background-${headerColorOrDefault}`}>
  <div className="content has-text-centered has-text-white">
    <p>
      <strong className="has-text-white">Kukulkan's Journey</strong> -  All Rights Reserved </p>
  </div>
</footer>
    </div>
    </>

  )
}
