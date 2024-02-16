//import { useContext } from "react"

//--Contexts
//import { AuthContext } from "../../contexts/auth"

//--Components
import  Header  from "../../components/Header"
import Title from "../../components/Title"

//-- React Icons
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"

//--style
import './dasboard.css'


 const Dasboard = () => {
//   const {logout} = useContext(AuthContext)

  // async function handleLogout(){
  //   await logout()
  // }

  return (
    <div>
      <Header />
      
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        <>
          <Link to="/new" className="new">
            <FiPlus size={25} color="#FFF"/>
            Novo chamado
          </Link>

          <table>
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Assuntos</th>
                <th scope="col">Status</th>
                <th scope="col">Cadastrando em</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label='Cliente'>Mercado da esquina</td>
                <td data-label='Assuntos'>Suporte</td>
                <td data-label='Status'>
                  <span className="badge" style={{backgroundColor: '#999'}}>
                   Em aberto
                  </span>
                </td>
                <td data-label='Cadastrado'>12/05/2022</td>
                <td data-label='#'>
                  <button className="action" style={{backgroundColor: '#3583f6'}}>
                    <FiSearch color="#FFF" size={17}/>
                  </button>
                  <button className="action" style={{backgroundColor: '#f6a935'}}>
                    <FiEdit2 color="#FFF" size={17}/>
                  </button>
                </td>
              </tr>


              <tr>
                <td data-label='Cliente'>Informatica Tech</td>
                <td data-label='Assuntos'>Suporte</td>
                <td data-label='Status'>
                  <span className="badge" style={{backgroundColor: '#999'}}>
                    Em aberto
                  </span>
                </td>
                <td data-label='Cadastrado'>12/05/2022</td>
                <td data-label='#'>
                  <button className="action" style={{backgroundColor: '#3583f6'}}>
                    <FiSearch color="#FFF" size={17}/>
                  </button>
                  <button className="action" style={{backgroundColor: '#f6a935'}}>
                    <FiEdit2 color="#FFF" size={17}/>
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </>
      </div>

    </div>
  )
}

export default Dasboard