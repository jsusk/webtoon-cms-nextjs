import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import NavigationButtons from './navigationButtons';

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
                           <NavigationButtons chapterData={props.chapterData}></NavigationButtons>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}