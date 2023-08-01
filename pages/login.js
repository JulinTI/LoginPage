import styles from '../styles/login.module.css'
import LoginCard from "../src/componentes/loginCard/loginCard"
import Input from "../src/componentes/input/input"
import Button from '../src/componentes/button/button'
import Link from "next/link"
import { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })


    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormEdit = (event, name) => {
        setFormData({ ...formData, [name]: event.target.value })
    }


    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            if (response.status !== 200) throw new Error(json)
            setCookie('authorization', json)
            router.push('/')

        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title="Login with your account!">
                <form className={styles.form} onSubmit={handleForm}>
                    <Input type="email" placeholder="Your Email" value={formData.email} required onChange={(e) => { handleFormEdit(e, 'email') }} />
                    <Input type="password" placeholder="Your Password" value={formData.password} required onChange={(e) => { handleFormEdit(e, 'password') }} />
                    <Button>Connect</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/registration">Create your account</Link>
                </form>
            </LoginCard>
        </div>
    )
}