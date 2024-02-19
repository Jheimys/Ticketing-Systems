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
import { useEffect, useState } from "react"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"


 const Dasboard = () => {

  const [ chamados, setChamados ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ isEmpty, setIsEmpty ] = useState(false)

  const listRef = collection(db, 'LogTickets')

  useEffect(() => {
    async function loadChamados(){
      const q = query(listRef, orderBy('created', 'desc'), limit(5))
      const querySnapshot = await getDocs(q)

      updateState(querySnapshot)
      setLoading(false)
    }

    loadChamados()

    return () => {}

  }, [])


  async function updateState(querySnapshot){
    const isCollectionEmpyt = querySnapshot.size === 0  

    if(!isCollectionEmpyt){
      let lista = []

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          status: doc.data().status,
          complemento: doc.data().complemento
        })
      })

      setChamados(chamados => [...chamados, ...lista])

    } else {
      setIsEmpty(true)
    }
  }

  return (
    <div>
      <Header />
      
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        <>
         
          { chamados.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum chamado encontrado...</span>

              <Link to="/new" className="new">
                <FiPlus size={25} color="#FFF"/>
                Novo chamado
             </Link>

            </div>
          ) : (
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
                </tbody>
              </table>

            </>
          )}
        </>
      </div>

    </div>
  )
}

export default Dasboard