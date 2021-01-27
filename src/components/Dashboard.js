import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import Navigation from './Navigation/LeftNavigation';
import styles from './Navigation/Navigation.module.css'

export default function Dashboard() {
    const {currentUser, logout} = useAuth();
    const history = useHistory();
    const [error,setError] = useState('');
    
    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }
    return (
        <>
            <div className={styles.Header}>
                <Navigation/>
                <Button className={styles.Link} variant="link" onClick={handleLogout}>Log Out</Button>
                {error}
            </div>
        </>
    )
}
