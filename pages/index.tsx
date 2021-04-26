import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getWebcomicChapters } from '../lib/chapters'

import "@fortawesome/fontawesome-free/js/all";

export async function getStaticProps() {
  const allComicChapters = getWebcomicChapters()
  return {
    props: {
      allComicChapters
    }
  }
}

export default function Home(props) {
  return (
    <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Kukulkan's Journey</title>
    </Head>
    <div className="back-layout">
      <section className="hero is-black is-halfheight is-mobile">
        <div className="hero-head"></div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">
              Kukulkan's Journey
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
                      src="/images/cover.jpg" // Route of the image file
                      height={450} // Desired size with correct aspect ratio
                      width={450} // Desired size with correct aspect ratio
                      alt="Cover"
                      className="image is-square"
                      priority={true}
                    />
                  </div>
              </div>
            </div>
          </div>
      </section>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-8 box">
            <div className="columns is-mobile">
              <div className="column is-12">
                  <div className="columns is-centered">
                    <div className="column is-6">
                      <div className="tabs is-centered is-boxed">
                        <ul>
                          <li className="is-active"><a>Chapters</a></li>
                          <li><a>Description</a></li>
                        </ul>
                      </div>
                    </div>
                  </div> 
              </div>
            </div>
            <div className="columns is-mobile">
              <div className="column is-12">
                <div className="columns is-centered">
                  <div className="column is-6">
                    {props.allComicChapters.map( ({ id, date, title, cover_path}) => (
                      <article id={id} className="media">
                        <figure className="media-left">
                          <Image
                                src={cover_path}// Route of the image file
                                height={80} // Desired size with correct aspect ratio
                                width={80} // Desired size with correct aspect ratio
                                alt={cover_path}
                                className="image is-square"
                              />
                        </figure>
                        <div className="media-content">
                            <div className="columns is-vcentered is-mobile chapter-content">
                              <div className="column">
                              <h2 className="subtitle"><Link href={`/chapters/${id}`}><a>{title}</a></Link></h2>
                              </div>
                            </div>
                        </div>
                        <div className="media-right">
                          <div className="columns is-vcentered is-mobile chapter-content">
                            <div className="column">
                              <span className="icon">
                                <i className="fas fa-chevron-right"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>

  )
}
