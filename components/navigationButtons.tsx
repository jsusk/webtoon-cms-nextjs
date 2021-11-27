import Link from 'next/link';

export default function NavigationButtons(props)
{
    return (
        <>
            <div className="field is-grouped is-grouped-centered">
                <p className="control">
                    <Link href={`/chapters/${props.chapterData.PreviousChapter }`}>
                        <button className="button is-info is-pulled-right is-medium" disabled={!props.chapterData.PreviousChapter}>Previous Chapter</button>
                    </Link>
                </p>
                <p className="control">
                    <Link href={`/chapters/${props.chapterData.NextChapter }`}>
                        <button className="button is-primary is-pulled-left is-medium" disabled={!props.chapterData.NextChapter}>Next Chapter</button>
                    </Link>
                </p>
            </div>
        </>
    )
}