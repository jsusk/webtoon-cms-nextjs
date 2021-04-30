import { Container } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getWebcomicChapters } from '../lib/chapters'
import ComicSummary from '../components/comicSummary'
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
        <div className="columns">
          <div className="column is-8">
            <div className="columns">
              <div className="column is-6 is-offset-6">
                <ComicSummary></ComicSummary>
              </div>
            </div>

            <div className="columns">
              <div className="column is-6 is-offset-6">
                <div className="columns">
                      <div className="column">
                        <div className="box chapter-list">
                          <div className="content">
                            <h2>Chapters</h2>
                          </div>
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
          <div className="column is-6 is-offset-0">
            <div className="columns">
              <div className="column is-4 ">
                <div className="box">
                  <div className="content">
                    <h3>Follow us also on:</h3>
                    <p>
                    <div className="field is-grouped">
                        <p className="control">
                          <button className="button is-medium">
                            <span className="icon is-medium">
                              <i className="fab fa-twitter-square fa-lg"></i>
                            </span>
                          </button>
                        </p>
                        <p className="control">
                        <button className="button is-medium">
                          <span className="icon is-medium">
                            <i className="fab fa-instagram fa-lg"></i>
                          </span>
                        </button>
                        </p>
                        
                    </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          </div>
        </div>



      </section>
      <footer className="footer">
  <div className="content has-text-centered">
    
  </div>
</footer>
    </div>
    </>

  )
}
