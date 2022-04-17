import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { getAllWebtoons } from '../lib/chapters_strapi'
import styles from './../styles/index.module.sass';

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
    <nav className="navbar " role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" >
          <p>Comics</p>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className='navbar-menu'>
        <a className='navbar-item'>
          Home
        </a>
        <a className='navbar-item'>
          Home
        </a>
      </div>
    </nav>
    <section className="hero is-medium is-dark">
      <div className="hero-body">
        <div className='container has-text-centered'>
          <p className="title">
            Medium hero
          </p>
          <p className="subtitle">
            Medium subtitle
          </p>
        </div>
     </div>
    </section>
    <section className='section'>
      <div className="container">
        <div className={`columns is-flex is-flex-wrap-nowrap ${styles.cardContainer}`}>
          {
            props.webComicInfo.map((comic,index) => {
              return (
                <>
                  <div className={`column is-3 ${styles.comicCard}`}>
                    <div className="card">
                      <div className='card-header'>
                        <p className='card-header-title'>
                          {comic.Title}
                        </p>
                      </div>
                      <div className="card-image">
                        <Link href={`/webtoons/${comic.WebtoonSEOURL}`}>
                          <a>
                            <Image src={`${localUrl}${comic.Cover.formats.large.url}`} 
                                  width={comic.Cover.formats.large.width} 
                                  height={comic.Cover.formats.large.height}
                                  className="image is-square"
                                  unoptimized={true}
                                  / >
                          </a>
                        </Link>
                     </div>
                      <div className="card-content">
                        <div className={`content ${styles.expandable}`}>
                          {comic.Summary}
                        </div>
                      </div>
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
      <strong className='has-text-white'>Kukulkan's Journey</strong> -  All Rights Reserved 
    </p>
  </div>
</footer>
    {/* <section className={`section ${styles.banner}`} >
      <div className="columns">
        <div className={`column is-4 is-offset-4  ${styles.banner}`} style={{backgroundImage: `url('${backImg}')`}}>

        </div>

      </div>
    </section> */}

    </>

  )
}
