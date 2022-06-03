import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from '../services/firestore'

export function useAuth() {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const authChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            }
            else {
                setCurrentUser(null)
            }
          })
        return authChange
        
    }, [])

    
    return currentUser
}


export function playerLogin(email, password){

    return signInWithEmailAndPassword(auth, email, password)
    
}

export function playerLogout(){
    signOut(auth)
}