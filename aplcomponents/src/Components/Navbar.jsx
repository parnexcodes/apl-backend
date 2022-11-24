import { Component } from "react";
import { MenuData } from "../Components/menuData"
import "../cssFiles/navbarStyles.css"
import stumps from "../assets/stumps.png"


class Navbar extends Component {

    state = { clicked: false }
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }


    render() {
        return (
            <nav className="NavbarItems">

                <div className=" flex justify-evenly">
                    <img className="h-10 logo_icon" src={stumps} />
                    <h1 className="logo ml-4">ARYA APL</h1>
                </div>

                <div className="menu-icons" onClick={this.handleClick}><i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"} ></i></div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu "}>
                    {
                    MenuData.map((item, index) =>
                     {
                        return (
                            <li key={index}>
                                <a href={item.url} className={item.cName}>
                                    <i className="${item.icons}">
                                    </i>{item.title}
                                </a>
                            </li>
                        )
                    })
                }

                </ul>

            </nav>
        )
    }
}
export default Navbar