import React,{useState, useEffect} from 'react';
import {Card, Container} from 'react-bootstrap';
import styles from './Tasks.module.css';
import {useAuth} from '../../context/AuthContext'
import results from '../results';
import Buttons from '../Buttons/Buttons';
import firebase from '../../firebase'
 function Tasks(){
     const [items, setItems] = useState([]);
     const {currentUser} = useAuth();
  
    useEffect(()=>{
        results.get('/task.json').then(response=>{
            // console.log(response.data)
            const fetchedResults = [];
                for(let key in response.data){
                    fetchedResults.unshift({
                        ...response.data[key],
                        id: key,
                    }
                    )
                }
            setItems(fetchedResults)
        })
     },[items])

        return (
            <Container>
                <div className="row d-flex justify-content-center text-center pt-4">
                    {items.map(result=>(
                        result.user === currentUser.uid &&
                        <div className="col-12 col-md-4" key={result.id}>
                        <Card className={styles.Card} >
                        <Card.Body>
                            <div>
                                {result.date}
                            </div>
                            <h2 className={styles.TaskTitle}>{result.title}</h2>
                            <div>
                                <p>{result.content}</p>
                            </div>
                            <div className="d-flex">
                                <Buttons  click={ () => firebase.database().ref('task/' + result.id).update({status: 'done'}).then(setItems(items))} 
                                class={styles.DoneBtn} disable={result.status === "done"}>Done</Buttons>
                                <Buttons  click={ () => firebase.database().ref('task/' + result.id).remove().then(setItems(items))} 
                                class={styles.DeleteBtn}>Delete</Buttons>
                                <Buttons  class={styles.EditBtn}>Edit</Buttons>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                    )) }
                </div>
            </Container>
        )
 }
    export default Tasks;
