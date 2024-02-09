import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"


const Dasboard = () => {
  const {logout} = useContext(AuthContext)

  async function handleLogout(){
    await logout()
  }

  return (
    <div>
      <h1>Dasboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>

    </div>
  )
}

export default Dasboard