import React from 'react'

const NavbarLink = ({link, display}) => {
    return (
        <li className="nav-item">
            <a className = "nav-link" href={link}>{display}</a>
        </li> 
    )
}

NavbarLink.defaultProps = {
    link: "#",
    display: "temp",
}

export default NavbarLink
