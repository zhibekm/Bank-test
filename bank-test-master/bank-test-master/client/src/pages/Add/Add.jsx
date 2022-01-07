
import React, { useState, useEffect, useContext } from 'react'
import Auth from "./../Auth/Auth.module.css"
import Styles from "./Add.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useMediaQuery } from 'react-responsive'
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { AuthContext } from '../../context/AuthContext'

const CreatePage = () => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const { token } = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const errorMessage = useError()
    const successMessage = useSuccess()
    const [form, setForm] = useState({
        amount: "",
        bankName: ""
    })

    useEffect(() => {
        errorMessage(error)
        clearError()
    }, [error, errorMessage, clearError])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const addTransaction = async (e) => {
        e.preventDefault()
        if (form.amount !== "" || form.bankName !== "") {
            try {
                const data = await request("/api/bank/add", "POST", { amount: form.amount, bankName: form.bankName }, {
                    Authorization: `Bearer ${ token }`
                })
                successMessage(data.message)
            } catch (e) {}
        } else {
            errorMessage("Inputs should not be empty")
        }
    }

    const small = useMediaQuery(
        { minDeviceWidth: 600 }
    )

    const items = [
        {id: "amount", name: "Amount", type: "number"},
        {id: "bankName", name: "Bank name", type: "text"}
    ]

    const elems = items.map(({id, name, type}) => {
        return(
            <div key={ id } className={Auth.inputBlock}>
                
                <input type={ type } 
                    className={Auth.input} 
                    name={ id }
                    placeholder={ name }
                    value={ type === "number" ? form.amount : form.bankName } 
                    onChange={changeHandler} />
                <label htmlFor={ id } className={Auth.label}>{ name }</label>
                
            </div>
        )
    })

    return(
        <div className={Styles.add}>
            <h2 className={Styles.heading}>Add Transaction</h2>
            <form action="#" className={small ? `${Auth.form} ${Styles.form}` : `${Auth.form} ${Styles.form} ${Styles.formMedia}`}>
                {elems}
                <div className={Auth.buttons}>
                    <a 
                        href="/"
                        className={loading ? Auth.loading : Auth.btn}
                        onClick={addTransaction}>{loading ? "" : "Add"}</a>
                </div>
            </form>
        </div>
    )
}

export default CreatePage
