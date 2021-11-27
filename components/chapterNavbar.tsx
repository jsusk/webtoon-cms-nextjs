import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function ChapterNavbar(props)
{
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false)


    return (
        <>
       <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href={`/webtoons/${props.chapterData.WebtoonSEOURL}`}>
                <a className="navbar-item">
                    {props.chapterData.Title}
                </a>
                </Link>
                <a role="button" className={`navbar-burger ${isVisible? "is-active" : "" }`}aria-label="menu" aria-expanded="false" onClick={() => setIsVisible(!isVisible)}> 
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu  ${isVisible? "is-active" : "" }`}>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="level">
                            <div className="level-item has-text-centered">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <div className="buttons">
                                            <Link href={`/chapters/${props.chapterData.PreviousChapter }`}>
                                                <button className="button is-info is-medium" disabled={!props.chapterData.PreviousChapter}>Previous Chapter</button>
                                            </Link>
                                            <Link href={`/chapters/${props.chapterData.NextChapter }`}>
                                                <button className="button is-primary is-medium" disabled={!props.chapterData.NextChapter}>Next Chapter</button>
                                            </Link>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}