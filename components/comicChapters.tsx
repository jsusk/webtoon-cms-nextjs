import Image from 'next/image'
import Link from 'next/link'

export default function ComicChapters(props)
{
    return (
        <>
        {props.chapters.map( (chapter, index) => (
                            <article id={chapter.id} className="media">
                              <figure className="media-left">
                                <Image
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${chapter.Cover.formats.thumbnail.url}`}// Route of the image file
                                      height={64} // Desired size with correct aspect ratio
                                      width={64} // Desired size with correct aspect ratio
                                      unoptimized={true}
                                      alt={chapter.Cover.alternativeText}
                                      priority={true}
                                      className="image is-square is-64x64"
                                    />
                              </figure>
                              <div key={index} className="media-content">
                                  <div className="columns is-vcentered is-mobile chapter-content">
                                    <div className="column">
                                    <h2 className="subtitle"><Link href={`/chapters/${chapter.SEOUrl}`}><a>{chapter.Title}</a></Link></h2>
                                    </div>
                                  </div>
                              </div>
                              <div key={index} className="media-right">
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