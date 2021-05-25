import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import { getWebtoonData } from '../lib/chapters_strapi'

import ComicSummary from '../components/comicSummary'
import ComicChapters from '../components/comicChapters'

import "@fortawesome/fontawesome-free/js/all";
import Link from 'next/link'


export async function getStaticProps() {
  const webComicInfo = await getWebtoonData()

  return {
    props: {
      webComicInfo,
      flights : { mailListEnable: false }
    }
  }
}

export default function Home(props) {
  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{props.webComicInfo.Title}</title>
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
            <div className="column is-10">
              <div className="columns is-centered">
                  <div className="box"> 
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${props.webComicInfo.Cover.formats.medium.url}`} // Route of the image file
                      height={450} // Desired size with correct aspect ratio
                      width={450} // Desired size with correct aspect ratio
                      alt={props.webComicInfo.Cover.alternativeText}
                      className="image is-square"
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
                  <div className="content">
                    <h3>Sign to our mailing list:</h3>
                    <p>Get notified when new chapter is issue and get Chapter 1 for free on PDF when sign up</p>
                    <div className="field has-addons">
                  
                      <p className="control has-icons-left">
                        <input className="input" type="email" placeholder="Email" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope fa-sm"></i>
                        </span>
                      </p>
                      <div className="control">
                        <a className="button is-info">
                          Sign Up
                        </a>
                      </div>
                    </div>
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
