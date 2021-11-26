import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import {  getAllWebtoonsIds, getWebtoonDataWithId} from '../../lib/chapters_strapi'


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

  let naverWebtoon = [];
  let naverWebtoonUrl = props.webComicInfo.NaverWebtoonURL;
  if(naverWebtoonUrl && naverWebtoonUrl.length > 0)
  {
    naverWebtoon.push(naverWebtoonUrl)
  }

  let tapasWebtoon = [];
  let tapasWebtoonUrl = props.webComicInfo.TapasWebtoonURL;
  if(tapasWebtoonUrl && tapasWebtoonUrl.length > 0)
  {
    tapasWebtoon.push(tapasWebtoonUrl)
  }

  let headerColor = props.webComicInfo.PageColor;
  let headerColorOrDefault = "black";

  if(headerColor && headerColor.length > 0)
  {
    headerColorOrDefault = headerColor;
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
            <div className="column is-narrow box">
                <div>
                    <Link href={`/webtoons/${props.webComicInfo.WebtoonSEOURL}`}>
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
          {
            naverWebtoon.map(webtoonURL => (
              <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href={webtoonURL}>
                    <button className="button is-large is-fullwidth is-rounded is-link ">Read on Webtoon</button>
                  </Link>
               
              </div>
            </div>
            ))
          }
          {
            tapasWebtoon.map(webtoonURL => (
              <div className="columns">
              <div className="column is-6 is-offset-6">
                  <Link href={webtoonURL}>
                    <button className="button is-large is-fullwidth is-rounded is-link ">Read on Tapas</button>
                  </Link>
               
              </div>
            </div>
            ))
          }
          <div className="columns">
            <div className="column is-6 is-offset-6">
                  <Link href={`/webtoons/${props.webComicInfo.WebtoonSEOURL}`}>
                    <button className="button is-large is-fullwidth is-rounded is-link ">All Chapters</button>
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
