import {useState} from 'react';
import './home.css'
import {Link} from 'react-router-dom';
import {auth} from '../../firebaseConecction'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { GoogleLogo } from "@phosphor-icons/react";


export default function Home(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleGoogleSign(){
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
        .then((result) => {
            toast.success('Login realizado com sucesso!')
            navigate('/admin', {replace: true})
        })
        .catch((error) => {
            toast.error('Erro ao fazer login, tente novamente!')
            console.log('Erro ao fazer login com Google: ', error)
        })

    }
    async function handleLogin(e){
        e.preventDefault();
        if (email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success('Login realizado com sucesso!')
                navigate('/admin', {replace: true})
            })
            .catch((error) => {
                toast.error('Erro ao fazer login, tente novamente!')
                console.log('Erro ao fazer login: ', error)
            })

        }
        else{
            toast.warn('Preencha todos os campos!')

        }
    }
    return(
        <div className="homeContainer">
            <h1> Tudu </h1>
            <span> Planeje, realize, conquiste – com Tudu </span>
            <form className="form" onSubmit={handleLogin}>
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
                    
                <button type="submit" className="buttonLogin"> Entrar </button>

            </form>

            <button onClick={(e) => handleGoogleSign(e)} className="customButton"> 
                    <GoogleLogo className="buttonGoogle"/>
                    Entrar com o Google
                    
                </button>

            <Link to='/register' className="link">
                Não possui uma conta? Cadastre-se agora.
            </Link>
        </div>
    )
}