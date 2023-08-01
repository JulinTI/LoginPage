import { useState } from 'react'
import styles from '../styles/login.module.css'
import LoginCard from "../src/componentes/loginCard/loginCard"
import Input from "../src/componentes/input/input"
import Button from '../src/componentes/button/button'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch(`/api/user/registration`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            if (response.status !== 200) throw new Error(json)
            setCookie('authorization', json)
            router.push('/login')

        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div className={styles.background}>
            <LoginCard title="Create a new account!">
                <form onSubmit={handleForm} className={styles.form}>
                    <Input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => { handleFormEdit(e, 'name') }} />
                    <Input type="email" placeholder="Your Email" required value={formData.email} onChange={(e) => { handleFormEdit(e, 'email') }} />
                    <Input type="password" placeholder="Your Password" required value={formData.password} onChange={(e) => { handleFormEdit(e, 'password') }} />
                    <Button>Send</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/login">I already have an account</Link>
                </form>

            </LoginCard>
        </div>
    )
}