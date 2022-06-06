import Head from 'next/head'
import Image from 'next/image'
import { getAllWebtoons } from '../lib/chapters_strapi'
//import styles from './../styles/index.module.sass';
import IndexNavbar from '../components/indexNavbar'

import "@fortawesome/fontawesome-free/js/all";
import Link from 'next/link'


export async function getStaticProps() {
  const webComicInfo = await getAllWebtoons()
  return {
    props: {
      webComicInfo,
      flights : { mailListEnable: true }
    }
  }
}

export default function Home(props) {
  const localUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Comics</title>
      <script async defer data-domain="kukulkansjourney.info" src="https://plausible.io/js/plausible.js"></script>
      <script src="/js/mail.js"></script>
    </Head>
    <IndexNavbar></IndexNavbar>
    <section className="hero is-medium is-dark">
      <div className="hero-body">
        <div className='container has-text-centered'>
          <p className="title">
            Teots Webtoons
          </p>
          <p className="subtitle">
            Webtoons inspirados en México con un toque de  ánime y manga
          </p>
        </div>
     </div>
    </section>
    <section className='section'>
      <div className="container">
        <div className={`columns is-mobile`}>
          {
            props.webComicInfo.map((comic,index) => {
              return (
                <>
                  <div key={index} className={`column`}>
                    <div className="card">
                      <div className='card-header'>
                        <p className='card-header-title has-text-centered'>
                        <Link href={`${comic.NaverWebtoonURL}`}>
                          <a>
                          {comic.Title}
                          </a>
                        </Link>
                        </p>
                      </div>
                      <div className="card-image">
                        <Link href={`${comic.NaverWebtoonURL}`}>
                          <a>
                            <Image src={`${localUrl}${comic.Cover.formats.small.url}`}
                                  width={comic.Cover.formats.medium.width}
                                  height={comic.Cover.formats.medium.height}
                                  className="image is-square"
                                  unoptimized={true}
                                  / >
                          </a>
                        </Link>
                     </div>
                      {/*<div className="card-content">
                        <div className={`content`}>
                          {comic.Summary}
                        </div>
                      </div>*/
                      }
                      <footer className="card-footer">
                        <Link href={`${comic.NaverWebtoonURL}`}>
                          <a className="card-footer-item">Leer en webtoon</a>
                        </Link>
                        {/*
                        <Link href={`/webtoons/${comic.WebtoonSEOURL}`}>
                          <a href="#" className="card-footer-item">All Chapters</a>
                        </Link>
                          */}
                      </footer>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </section>
    <footer className={`footer has-background-dark`}>
      <div className="content has-text-white has-text-centered">
        <p>
          <strong className='has-text-white'>Teots Webtoons</strong> -  All Rights Reserved
        </p>
      </div>
    </footer>
    </>

  )
}
