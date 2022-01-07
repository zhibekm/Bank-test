import React, { useContext, useState } from "react"
import Styles from "./Navbar.module.css"
import Container from "./../../App.module.css"
import { useMediaQuery } from 'react-responsive'
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext"
import LogOut from "./../../assets/img/logout.png"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext) 
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

    const logoutHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push("/")
    }

    const showModal = e => {
        e.preventDefault()
        setShow(true)
    }

    const logoutCancel = e => {
        e.preventDefault()
        setShow(false)
        history.push("/")
    }

    const menuOpen = e => {
        e.preventDefault()

        if (open === false){
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const small = useMediaQuery(
        { minDeviceWidth: 520 }
    )

    const items = [
        {url: "/add", id: 1, name: "Add"},
        {url: "/list", id: 2, name: "List"}
    ]

    const elems = items.map(({url, id, name}) => {
        return(
            <li key={ id } className={Styles.item}>
                <NavLink to={ url } className={small ? 
                    Styles.link : 
                    open ? `${Styles.link} ${Styles.linkMedia} ${Styles.open}` :
                    `${Styles.link} ${Styles.linkMedia}`}>{ name }</NavLink>
            </li>
        )
    })

    return(
        <nav className={Styles.navbar}>
            <div className={Container.container}>
                <div className={Styles.flexBlock}>
                    <div className={Styles.title}>
                        <a href="/" className={Styles.logo} onClick={logoutCancel}>Bank</a>
                        <a href="/" className={small ? Styles.ham : `${Styles.ham} ${Styles.hamMedia}`} onClick={menuOpen}>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                            <span className={Styles.line}></span>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                        </a>
                    </div>
                    <ul className={small ? Styles.menu : open ? `${Styles.menu} ${Styles.menuMedia} ${Styles.open}` : `${Styles.menu} ${Styles.menuMedia}`}>
                        { elems }
                        <li className={Styles.item}>
                            <a href="/" className={small ? 
                                `${Styles.link} ${Styles.colored}` : 
                                open ? `${Styles.link} ${Styles.colored} ${Styles.linkMedia} ${Styles.open}` :
                                `${Styles.link} ${Styles.colored} ${Styles.linkMedia}`} onClick={showModal}>
                                <img className={Styles.icon} src={LogOut} alt="logout"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={`${Styles.overlay} ${show ? Styles.active : !show}`} onClick={logoutCancel}></div>
                <div className={`${small ? Styles.message : `${Styles.message} ${Styles.messageMedia}`} ${Styles.message} ${show ? Styles.active : !show}`}>
                    <p className={Styles.text}>Are you sure, that you want to logout?</p>
                    <a href="/" className={`${Styles.submit} ${Styles.left}`} onClick={logoutHandler}>Yes</a>
                    <a href="/" className={`${Styles.submit} ${Styles.right}`} onClick={logoutCancel}>No</a>
                </div>
            </div>
        </nav>
    )
}