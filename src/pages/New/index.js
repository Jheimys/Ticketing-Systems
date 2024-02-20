import { useContext, useEffect, useState } from "react"

//--React Router Dom --
import { useNavigate, useParams } from "react-router-dom"

//--- Components --- 
import Header from "../../components/Header"
import Title from "../../components/Title"

//--- React Icons ---
import { FiPlus } from "react-icons/fi"

//--- Firebase ------
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

// --- contexts ----
import { AuthContext } from "../../contexts/auth"

//--- Toast ----
import { toast } from "react-toastify"

import './new.css'

export default function New(){

    const [ customers, setCustomers ] = useState([])
    const [ loadCustomer, setLoadCustomer ] = useState(true)
    const [ customerSelected, setCustomerSelected ] = useState(0)
    const [ idCustomer, setIdCustomer ] = useState(false)

    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

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

                if(id) {
                    loadId(lista)
                }
            })
            .catch((error) => {
                console.log('ERRO AO BUSCAR CLIENTES', error)
                setLoadCustomer(false)
                setCustomers([{id: '1', nomeFantasia: 'Freela'}])
            })
        }

        loadCustomers()

    }, [id])

    async function loadId(lista){
        const docRef = doc(db, "LogTickets", id)
        await getDoc(docRef)
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setCoplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setCustomerSelected(index)
            setIdCustomer(true)
        })
        .catch((error) => {
            console.log(error)
            setIdCustomer(false)
        })
    }

    function handleOptionChange(e){
        setStatus(e.target.value)
    }

    function handeChangeSelect(e){
        setAssunto(e.target.value)
        
    }

    function handleChangeCustomer(e){
        setCustomerSelected(e.target.value)
    }

    async function handleRegister(e){
        e.preventDefault()

        if(idCustomer){
            const docRef = doc(db, "LogTickets", id)
            await updateDoc(docRef, {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid
            })
            .then(() => {
                toast.info("Chamado atualizado com sucesso!")
                setCustomerSelected(0)
                setCoplemento('')
                navigate('/dashboard')
            })
            .catch((error) => {
                toast.error('Ops, erro ao atualizar esse chamado!')
                console.log(error)
            })

            return
        }

        //submit a ticket
        await addDoc(collection(db, "LogTickets"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado registrado!')
            setCoplemento('')
            setCustomerSelected(0)
        })
        .catch((error) => {
            toast.error('Ops erro ao registrar, tente mais tarde!')
            console.log(error)
        })
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name={id ? "Editando chamado" : "Novo chamado"}>
                    <FiPlus size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
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