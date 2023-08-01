import { getCookie } from "cookies-next"
import { verify } from "../services/user"
import styles from "../styles/index.module.css"

export default function Home() {
  return (
    <div className={styles.h1}>
      <h1>Página segura - Perfil do Usuario</h1>
      <h1>Projeto criado por Julio Cesar</h1>
      <h1>Next.js / React.js / Node.js e banco de dados</h1>
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', { req, res })
    if (!token) throw new Error('invalid token')

    verify(token)
    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login '
      },
      props: {

      }
    }
  }
}