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

          <div className="column is-half box summary">
            <div className="columns">
              <div className="column">
                  <div className="content expandable">
                    <h1>Summary</h1>
                    <p>
                    Over 2000 years ago in Mexico, the Olmec civilization developed a tool to awaken super natural powers in individuals. These tools were called ‘Teots.’ Their existence remained hidden until 85's Mexico City’s earthquake. Jorge Jolife, a boy whose parents are gone due to drugs and crime, obtained a Teots from a secret man who saved him during the earthquake using this mysterious power.  
      Now in 2004, Jorge Jolife, one of the smartest software engineers in Mexico, founded MXBits, a company that uses the powers of ‘Teots’ to help reduce violence in Mexico. His dream is to create a better and safe place to live. However, he soon realizes he is not the only one interested in using the Teots. Luis Estrada, one of the most intelligent drug lords in Mexico, wants to use the power of Teots to gain dominance of the drug business with fear and violence. 

      Confrontation is inevitable. Will Jorge be able to triumph over Luis Estrada’s cartel expansion goals? 
                    </p>
                  </div>
                  <button className="button is-small is-pulled-right">More</button>
              </div>
            </div>
            <div className="columns is-centered">
                <div className="column  is-half summary-actions">
                  <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                      <a className="button is-primary">
                        Chapter 1
                      </a>
                    </p>
                    <p className="control">
                      <a className="button is-info">
                        Latest Chapter
                      </a>
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/*<div className="columns is-centered">

          <div className="column is-8 box">
            <div className="columns is-centered">
                <div className="column is-2 has-text-centered">
                    <button className="button is-primary">Read First Chapter</button>
                </div>
                <div className="column is-2 has-text-centered">
                  <button className="button is-warning">Read Latest Chapter</button>
                </div>
            </div>
          </div>
                
      </div>*/}

        <div className="columns is-centered">
          <div className="column is-half">
            {/*<div className="columns">
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
              </div>*/}
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
      </section>
      <footer className="footer">
  <div className="content has-text-centered">
    
  </div>
</footer>
    </div>
    </>

  )
}
