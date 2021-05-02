import styles from './comicSummary.module.sass'
import { useState } from 'react';

export default function ComicSummary(props){

    const [isVisiable, setIsVisiable] = useState(false)

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
                    <div className="columns is-centered">
                        <div className={`column  is-half ${styles.summaryActions}`}>
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
            </>
    )

}  