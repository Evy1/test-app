import React,{Component} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import results from '../results';
import {Link} from 'react-router-dom';
import Dashboard from '../Dashboard';
import styles from './TaskForm.module.css';

class TaskForm extends Component{

    state = {
        title: '',
        content: '',
        date: ''
    }
  postHandler = (e) =>{
    e.preventDefault();
    const data = {
        title: this.state.title,
        content: this.state.content,
        date: this.state.date
    }
    results.post('/task.json', data).then(response=>{
        console.log(response);
    }).catch(error=>{
        console.log(error);
    })
  }
  taskHandler = ()=>{
    results.get( '/task.json' )
    .then( res => {
        const fetchedOrders = [];
        for ( let key in res.data ) {
            fetchedOrders.push( {
                ...res.data[key],
                id: key
            } );
        }
      console.log(fetchedOrders)
    } )
    .catch( err => {
        console.log(err)
    } );
  }
    render() {
       return(
            <>
            <Dashboard/>
            <Container>
                <div className="row py-4 justify-content-center">
                    <h2>Add a new task here</h2>
                </div>
                <div className="row">
                    <form onSubmit={this.postHandler} className={styles.Form}>
                        <Form.Group id="title" className="d-flex justify-content-center flex-column text-center">
                            <label>Task Title</label>
                            <input className={styles.Input} type="text"  required placeholder="Title" value={this.state.title} onChange={(e)=> this.setState({title: e.target.value})}/>
                        </Form.Group>
                        <Form.Group id="content" className="d-flex justify-content-center flex-column text-center">
                            <label>Task Content</label>
                            <textarea className={styles.Input} type="textarea" rows={3} required placeholder="Task" value={this.state.content} onChange={(e)=> this.setState({content: e.target.value})}/>
                        </Form.Group>
                        <Form.Group id="date" className="d-flex justify-content-center flex-column text-center">
                            <label>Pick a deadline</label>
                            <input className={styles.Input} type="datetime-local" value={this.state.date} onChange={(e)=> this.setState({date: e.target.value})}></input>
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
}
export default TaskForm;
