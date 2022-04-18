import Link from "next/link";

export default function IndexNavbar(props)
{
    return (<>
    <nav className="navbar " role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" >
          <p className="title is-4">
              <Link href={"/"}>
                  <a>Home</a>
              </Link>
          </p>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
    </>)
}