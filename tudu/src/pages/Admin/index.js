import './admin.css'
import {useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConecction'
import { signOut} from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify';

export default function Admin(){
    const [tarefa, setTarefa] = useState('')
    const [user, setUser] = useState({})
    const [listaTarefas, setListaTarefas] = useState([])
    const [editableTarefa, setEditableTarefa] = useState({})
    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail){
                const data = JSON.parse(userDetail)

                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let list = []
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            tarefa: doc.data().task,
                            userUid: doc.data().userUid,
                        })
                    })
                    setListaTarefas(list)
                })
            }
        }
        loadTarefas()
    }, [])

    async function handleUpdateTarefa(){
        const docRef = doc(db, 'tarefas', editableTarefa.id)
        await updateDoc(docRef, {
            task: tarefa
        })
        .then(() => {
            toast.success('Tarefa atualizada com sucesso!')
        })
        .catch(() => {
            toast.error('Erro ao atualizar tarefa, tente novamente!')
        })  
        setTarefa('')
        setEditableTarefa({})
    }
    async function handleSubmit(e) {
        e.preventDefault()
        

        if (tarefa === ''){
            toast.error('Digite uma tarefa válida!');
            return;
        }

        if (editableTarefa?.id){
            handleUpdateTarefa()
            return
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

    async function deleteTarefa(id){
        const docRef = doc(db, 'tarefas', id)
        await deleteDoc(docRef)
        .then(() => {
            toast.success('Tarefa concluída!')
        })
        .catch(() => {
            toast.error('Erro ao concluir tarefa, tente novamente!')
        })
    }

    async function editarTarefa(item){
        setTarefa(item.tarefa)
        setEditableTarefa(item)
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

                {Object.keys(editableTarefa).length > 0 ? (
                    <button type="submit" style={{backgroundColor: '#efe6dd'}} className="buttonRegister"> Atualizar Tarefa </button>
                ): (
                    <button type="submit" className="buttonRegister buttonColor"> Registrar Tarefa </button>
                )}
            </form>

           {listaTarefas.map((item) => (
                <article className="list" key={item.id}>
                <p> {item.tarefa} </p>

                <div>
                    <button className="buttonDone" onClick= {() => editarTarefa(item)}> Editar </button>
                    <button className="buttonDelete" onClick={() => deleteTarefa(item.id)}> Concluir </button>
                </div>
            </article>
           ))}

            <button className="buttonLogout" onClick={handleLogout}>Sair</button>

        </div>
    )
}