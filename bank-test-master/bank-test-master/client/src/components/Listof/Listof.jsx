import React, { useCallback, useContext } from "react"
import Styles from "./Listof.module.css"
import Delete from "./../../assets/img/delete.svg"
import { useMediaQuery } from 'react-responsive'
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import { useHistory } from "react-router-dom"

export const Listof = ({ transaction }) => {
    const history = useHistory()
    const { token } = useContext(AuthContext)
    const { request } = useHttp()

    const deleteItem = useCallback(async (_id) => {
        try {
            await request(`/api/bank/delete/${_id}`, "DELETE", {
                Authorization: `Bearer ${token}`
            })
            history.push("/add")
            history.push("/list")
        } catch (e) {}
    }, [token, request, history])

    const small = useMediaQuery(
        { minDeviceWidth: 900 }
    )

    const temp = small ? Styles.item : `${Styles.item} ${Styles.itemMedia}`
    const text = small ? Styles.big : `${Styles.big} ${Styles.bigMedia}`
    
    const elems = transaction.map(({amount, bankName, date, _id}) => {
        return(
            <div className={Styles.block} key={ date }>
                <p className={ temp }>{ new Date(date).toLocaleDateString() }<span className={Styles.time}>{ " / " + new Date(date).toLocaleTimeString() }</span></p>
                <p className={ temp }>{ bankName.charAt(0).toUpperCase() + bankName.substr(1) }</p>
                <p className={ temp }>{ amount }$</p>
                <p key={ _id } className={Styles.link}><a href="/" className={Styles.del} onClick={e => { e.preventDefault(); deleteItem(_id) }}><img className={small ? Styles.img : `${Styles.img} ${Styles.imgMedia}`} src={Delete} alt="delete"/></a></p>
            </div>
        )
    })
    
    if (transaction.length === 0) {
        return(
            <div className={Styles.all}>
                <p className={Styles.text}>No transactions!</p>
            </div>
        )
    } else {
        return(
            <div className={small ? Styles.all : `${Styles.all} ${Styles.allMedia}`}>
                <div className={Styles.block}>
                    <p className={`${ temp } ${ text }`}>Date / Time</p>
                    <p className={`${ temp } ${ text }`}>Bank name</p>
                    <p className={`${ temp } ${ text }`}>Amount</p>
                </div>
                { elems }
            </div>
        )
    }
}