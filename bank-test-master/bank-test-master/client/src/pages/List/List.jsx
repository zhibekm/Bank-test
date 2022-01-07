
import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Styles from "./List.module.css"
import Auth from "./../Auth/Auth.module.css"
import { AuthContext } from '../../context/AuthContext'
import { Listof } from "./../../components/Listof/Listof"

const LinksPage = (userId) => {
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [transaction, setTransation] = useState(undefined)
    const id = userId.id

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`api/bank/${id}`, "GET", null, {
                Authorization: `Bearer ${ token }`
            })
            setTransation(fetched)
        } catch (e) {}
    }, [token, id, request])

    useEffect(() => {
        getData()
    }, [getData]) 

    return(
        <div className={Styles.list}>
            <h2 className={Styles.heading}>List of transactions</h2>
            { loading ? <div className={`${Auth.loading} ${Styles.loading}`}></div> : transaction && <Listof transaction={transaction} /> }
        </div>
    )
}

export default LinksPage
