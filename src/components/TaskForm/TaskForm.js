import React,{Component, useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import results from '../results';
import {Link} from 'react-router-dom';
import Dashboard from '../Dashboard';
import styles from './TaskForm.module.css';
import {useAuth} from '../../context/AuthContext'

function TaskForm(){

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [date, setDate] = useState();
    const {currentUser} = useAuth();

  const postHandler = e =>{
    e.preventDefault();
    const data = {
        title: title,
        content: content,
        date: date,
        user: currentUser.uid
    }
    results.post('/task.json', data).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
  }

   
       return(
            <>
            <Dashboard/>
            <Container>
                <div className="row py-4 justify-content-center">
                    <h2>Add a new task here</h2>
                </div>
                <div className="row">
                    <form onSubmit={postHandler} className={styles.Form}>
                        <Form.Group id="title" className="d-flex justify-content-center flex-column text-center">
                            <label>Task Title</label>
                            <input className={styles.Input} type="text"  required placeholder="Title" value={[title]} onChange={(e)=> setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group id="content" className="d-flex justify-content-center flex-column text-center">
                            <label>Task Content</label>
                            <textarea className={styles.Input} type="textarea" rows={3} required placeholder="Task" value={[content]} onChange={(e)=> setContent( e.target.value)}/>
                        </Form.Group>
                        <Form.Group id="date" className="d-flex justify-content-center flex-column text-center">
                            <label>Pick a deadline</label>
                            <input className={styles.Input} type="datetime-local" value={[date]} onChange={(e)=> setDate(e.target.value)}></input>
                        </Form.Group>
                        <div>
                            <Button type="submit">Submit</Button>
                            <Link className="btn-primary p-2 ml-4" to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </Container>
            {/* {this.taskHandler()} */}
            </>
       )
    
}
export default TaskForm;
