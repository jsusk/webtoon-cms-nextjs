import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { getWebtoonData } from '../lib/chapters_strapi'


import "@fortawesome/fontawesome-free/js/all";
import Link from 'next/link'

export async function getStaticProps() {
    const webComicInfo = await getWebtoonData()
  
    return {
      props: {
        webComicInfo
      }
    }
  }

export default function Home(props) {

  let chapters = props.webComicInfo.chapters;
  let renderFirstChapters = [];
  let firstChapter = chapters[0];
  if(firstChapter)
  {
      renderFirstChapters.push(firstChapter);
  }
  let renderLatestChapter = [];
  let lastChapter = chapters[chapters.length -1 ];
  if(lastChapter)
  {
      renderLatestChapter.push(lastChapter);
  }


  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{props.webComicInfo.Title}</title>
      <script async defer data-domain="kukulkansjourney.info" src="https://plausible.io/js/plausible.js"></script>
    </Head>
    <div className="back-layout">
      <section className="hero is-black is-halfheight is-mobile">
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
            <div className="column is-narrow box">
                <div>
                    <Link href="/">
                        <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.webComicInfo.Cover.formats.medium.url}`} // Route of the image file
                        height={250} // Desired size with correct aspect ratio
                        width={250} // Desired size with correct aspect ratio
                        alt={props.webComicInfo.Cover.alternativeText}
                        className="image is-square"
                        unoptimized={true}
                        priority={true}
                        />
                    </Link>
                </div>
            </div>
          </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column is-8">
          {
            renderLatestChapter.map(chapter => (
              <div className="columns">
                <div className="column is-6 is-offset-6">
                    <Link href={`/chapters/${chapter.SEOUrl}`}>
                      <button className="button is-large is-fullwidth is-rounded is-primary ">Latest Chapter</button>
                    </Link>
                </div>
              </div>
            ))
          }
          {
            renderFirstChapters.map(chapter => (
              <div className="columns">
                <div className="column is-6 is-offset-6">
                    <Link href={`/chapters/${chapter.SEOUrl}`}>
                      <button className="button is-large is-fullwidth is-rounded is-success">First Chapter</button>
                    </Link>
                </div>
              </div>
            ))
          }
            <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href="https://www.webtoons.com/en/challenge/kukulkans-journey/list?title_no=650279">
                    <button className="button is-large is-fullwidth is-rounded is-link ">Read on Webtoon</button>
                  </Link>
               
              </div>
            </div>
            <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href="https://tapas.io/series/Kukulkans-Journey">
                    <button className="button is-large is-fullwidth is-rounded is-info">Read on Tapas</button>
                  </Link>  
              </div>
            </div>
            <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href="https://www.reddit.com/r/kukulkansjourney/">
                    <button className="button is-large is-fullwidth is-rounded ">
                    <span className="icon is-medium">
                                  <i className="fab fa-reddit-square fa-lg"></i>
                    </span>
                    <span>Reddit</span>
                    </button>
                  </Link>  
              </div>
            </div>
            <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href="https://twitter.com/KukulkanJourney">
                    <button className="button is-large is-fullwidth is-rounded ">
                        <span className="icon is-medium">
                            <i className="fab fa-twitter-square fa-lg"></i>        
                        </span>
                        <span>Twitter</span>
                    </button>
                  </Link>  
              </div>
            </div>
          </div>
        </div>
      </section>
<footer className="footer has-background-black">
  <div className="content has-text-centered has-text-white">
    <p>
      <strong className="has-text-white">Kukulkan's Journey</strong> -  All Rights Reserved </p>
  </div>
</footer>
    </div>
    </>

  )
}
