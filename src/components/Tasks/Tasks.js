import React,{Component, useState} from 'react';
import {Card, Container} from 'react-bootstrap';
import styles from './Tasks.module.css';
// import instance from '../apis/instance';
import results from '../results'
 class Tasks extends Component {
    state={
        results: []
    }
    componentDidMount(){
        results.get('/task.json').then(response=>{
            console.log(response.data)
            const fetchedResults = [];
                for(let key in response.data){
                    fetchedResults.unshift({
                        ...response.data[key],
                        id: key,
                    }
                    )
                }
                this.setState({results: fetchedResults})
        })
    }

    render(){

        return (
            <Container>
                <div className="row d-flex justify-content-center text-center pt-4">
                    {this.state.results.map(result=>(
                        <div className="col-12 col-md-4">
                        <Card className={styles.Card} key={result.id}>
                        <Card.Body>
                            <div>
                                {result.date}
                            </div>
                            <h2 className={styles.TaskTitle}>{result.title}</h2>
                            <div>
                                <p>{result.content}</p>
                            </div>
                           
                            <div className="d-flex">
                                <button className={styles.DoneBtn}>Done</button>
                                <button className={styles.DeleteBtn}>Delete</button>
                                <button className={styles.EditBtn}>Edit</button>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                    ))}
                </div>
            </Container>
        )
    }
    }
    export default Tasks;
