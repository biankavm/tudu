
import {useState, useEffect} from 'react';
import { auth} from '../firebaseConecction'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom';
export default function Private({children}){

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                // Se tem user logado
                if (user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
    
                    localStorage.setItem("@detailUser", JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true);
                }
                else{
                // Não tem user logado
                setLoading(false);
                setSigned(false);
                }
            }
            )}
        checkLogin();
    }, [])

    if (loading){
        return <></>
    }
    if (!signed){
        return <Navigate to='/'/>
    }
    console.log('Passou aqui')
    return children;
}