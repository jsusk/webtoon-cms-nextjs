import styles from './comicSummary.module.sass'
import { useState } from 'react';

export default function ComicSummary(){

    const [isVisiable, setIsVisiable] = useState(false)

    return (
            <>
                <div className="box">
                    <div className="columns">
                    <div className={`column ${styles.summary}`}>
                        <div className={`content ${ isVisiable ? "" : styles.expandable} `}>
                            <h1>Summary</h1>
                            <p>
                            Over 2000 years ago in Mexico, the Olmec civilization developed a tool to awaken super natural powers in individuals. These tools were called ‘Teots.’ Their existence remained hidden until 85's Mexico City’s earthquake. Jorge Jolife, a boy whose parents are gone due to drugs and crime, obtained a Teots from a secret man who saved him during the earthquake using this mysterious power.  
                    Now in 2004, Jorge Jolife, one of the smartest software engineers in Mexico, founded MXBits, a company that uses the powers of ‘Teots’ to help reduce violence in Mexico. His dream is to create a better and safe place to live. However, he soon realizes he is not the only one interested in using the Teots. Luis Estrada, one of the most intelligent drug lords in Mexico, wants to use the power of Teots to gain dominance of the drug business with fear and violence. 

                    Confrontation is inevitable. Will Jorge be able to triumph over Luis Estrada’s cartel expansion goals? 
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