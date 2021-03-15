import React from 'react'
import { useHistory } from "react-router-dom";

const NavbarLink = ({link, display}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(link);
    }

    // const handleHome = () => {
    //     history.push("/");
    // };

    return (
        // <li className="nav-item">
        //     <a className = "nav-link" href={link}>{display}</a>
        // </li> 
        <li className="nav-item">
            <a className = "nav-link" onClick={handleClick}>{display}</a>
        </li> 
    )
}

NavbarLink.defaultProps = {
    link: "#",
    display: "temp",
}

export default NavbarLink
