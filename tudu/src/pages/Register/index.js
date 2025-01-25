import {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebaseConecction'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
export default function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        if (email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', {replace: true})
            })
            .catch((error) => {
                console.log('Erro ao fazer cadastro: ', error)
            })
        }
        else{
            alert('Preencha todos os campos!')

        }
    }
    return(
        <div className="homeContainer">
            <h1> Cadastre-se </h1>
            <span> Vamos criar a sua conta: </span>
            <form className="form" onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Digite seu email" 
                    value={email} 
                    onChange = {(e) => setEmail(e.target.value)}/>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)} />
                    
                <button type="submit"> Cadastrar </button>
            </form>

            <Link to='/' className="link">
                Já possui uma conta? Faça o login agora.
            </Link>
        </div>
    )
}