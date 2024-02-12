import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { Header } from "../../components/Header"


const Dasboard = () => {
  const {logout} = useContext(AuthContext)

  async function handleLogout(){
    await logout()
  }

  return (
    <div>
      <Header />
      <h1>Dasboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>

    </div>
  )
}

export default Dasboard