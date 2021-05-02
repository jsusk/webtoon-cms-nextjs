import Image from 'next/image'
import Link from 'next/link'

export default function ComicChapters(props)
{
    return (
        <>
        {props.chapters.map( (chapter) => (
                            <article id={chapter.id} className="media">
                              <figure className="media-left">
                                <Image
                                      src={`http://127.0.0.1:1337${chapter.Cover.url}`}// Route of the image file
                                      height={64} // Desired size with correct aspect ratio
                                      width={64} // Desired size with correct aspect ratio
                                      alt={chapter.Cover.alternativeText}
                                      className="image is-square is-64x64"
                                    />
                              </figure>
                              <div className="media-content">
                                  <div className="columns is-vcentered is-mobile chapter-content">
                                    <div className="column">
                                    <h2 className="subtitle"><Link href={`/chapters/${chapter.id}`}><a>{chapter.Title}</a></Link></h2>
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
                        )
        )
        
        }
        </>
    )
}