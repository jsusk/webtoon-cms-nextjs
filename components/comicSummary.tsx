import styles from './comicSummary.module.sass'
import { useState } from 'react';
import Link from 'next/link';

export default function ComicSummary(props){

    const [isVisiable, setIsVisiable] = useState(false)
    let chapterLenght = props.chapters.length;
    let firstChapter = props.chapters[0];
    let lastChapter = props.chapters[props.chapters.length -1 ];


    return (
            <>
                <div className="box">
                    <div className="columns">
                    <div className={`column ${styles.summary}`}>
                        <div className={`content ${ isVisiable ? "" : styles.expandable} `}>
                            <h1>Summary</h1>
                            <p>
                             {props.children}
                            </p>
                        </div>
                        <button className="button is-small is-pulled-right" onClick={() => setIsVisiable(!isVisiable)}> {isVisiable? "Close" : "More"}</button>
                    </div>
                    </div>
                    <div className={`columns is-centered ${ chapterLenght > 0? "" : "is-hidden"}`}>
                        <div className={`column  is-half ${styles.summaryActions}`}>
                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                            <Link href={`/chapters/${firstChapter.SEOUrl}`}>
                                <a className="button is-primary">
                                    First Chapter
                                </a>
                            </Link>
                            </p>
                            <p className="control">
                            <Link href={`/chapters/${lastChapter.SEOUrl}`}>
                                <a className="button is-info">
                                    Latest Chapter
                                </a>
                            </Link>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </>
    )

}  