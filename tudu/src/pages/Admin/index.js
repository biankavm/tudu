import './admin.css'
import {useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConecction'
import { signOut} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify';

export default function Admin(){
    const [tarefa, setTarefa] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))
        }
        loadTarefas()
    }, [])
    async function handleSubmit(e) {
        e.preventDefault()
        

        if (tarefa === ''){
            toast.error('Digite uma tarefa válida!');
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            task: tarefa,
            created: new Date().toLocaleDateString(),
            userUid: user?.uid
        })

        .then(() => {
            toast.success('Tarefa registrada com sucesso!')
            setTarefa('')
        })
        .catch((error) => {
            toast.error('Erro ao registrar: ', error)
        })


    }

    async function handleLogout(){
        await signOut(auth)
        .then(() => {
            toast.success('Deslogado com sucesso!')
        })
        .catch((error) => {
            toast.error('Erro ao deslogar, tente novamente!')
            console.log(error)
        })
    }

    return(
        <div className="adminContainer">
            
            <h1> Minhas Tarefas </h1>
            <form className="form" onSubmit={handleSubmit}>
                <textarea 
                    placeholder="Digite sua tarefa aqui..." 
                    value={tarefa} 
                    onChange={(e) => setTarefa(e.target.value)}
                />

                <button type="submit" className="buttonRegister"> Registrar Tarefa </button>
            </form>

            <article className="list">
                <p> Estudar Javascript e ReactJS hoje a noite</p>

                <div>
                    <button className="buttonDone"> Editar </button>
                    <button className="buttonDelete"> Concluir </button>
                </div>
            </article>

            <button className="buttonLogout" onClick={handleLogout}>Sair</button>

        </div>
    )
}