import { useContext, useEffect, useState } from "react"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlus } from "react-icons/fi"

import './new.css'
import { AuthContext } from "../../contexts/auth"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

export default function New(){

    const [ customers, setCustomers ] = useState([])
    const [ loadCustomer, setLoadCustomer ] = useState(true)
    const [ customerSelected, setCustomerSelected ] = useState(0)

    const { user } = useContext(AuthContext)

    const [ complemento, setCoplemento ] = useState('')
    const [ assunto, setAssunto ] = useState('Suporte')
    const [ status, setStatus ] = useState('Aberto')

    const listRef = collection(db, "customers")

    useEffect(() => {
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(snapshot.docs.size === 0){
                    console.log('NENHUMA EMPRESA FOI ENCONTRADA')
                    setLoadCustomer(false)
                    setCustomers([{id: '1', nomeFantasia: 'Freela'}])
                    return
                }

                setCustomers(lista)
                setLoadCustomer(false)
            })
            .catch((error) => {
                console.log('ERRO AO BUSCAR CLIENTES', error)
                setLoadCustomer(false)
                setCustomers([{id: '1', nomeFantasia: 'Freela'}])
            })
        }

        loadCustomers()

    }, [listRef])

    function handleOptionChange(e){
        setStatus(e.target.value)
    }

    function handeChangeSelect(e){
        setAssunto(e.target.value)
        
    }

    function handleChangeCustomer(e){
        setCustomerSelected(e.target.value)
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Novo chamado">
                    <FiPlus size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="...Caregando"/>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return(
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={handeChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input 
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input 
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input 
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                            type="text" 
                            placeholder="Descreva seu problema (Opcional)"
                            value={complemento}
                            onChange={(e) => setCoplemento(e.target.value)}
                        />

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}