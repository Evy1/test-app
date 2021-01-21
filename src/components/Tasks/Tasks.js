import React from 'react';
import {Card, Container} from 'react-bootstrap';
import styles from './Tasks.module.css';
export default function Tasks() {
    return (
        <Container>
        <div className="row d-flex justify-content-center text-center pt-4">
            <h2 className={styles.PageTitle}>Here are your most recent tasks.....</h2>
        </div>
            <div className="row py-4">
                <div className="col-12 col-md-4">
                    <Card className={styles.Card}>
                        <Card.Body>
                            <h2 className={styles.TaskTitle}>Task Title</h2>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className="d-flex">
                                <button className={styles.DoneBtn}>Done</button>
                                <button className={styles.DeleteBtn}>Delete</button>
                                <button className={styles.EditBtn}>Edit</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4">
                    <Card className={styles.Card}>
                        <Card.Body>
                            <h2 className={styles.TaskTitle}>Task Title</h2>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className="d-flex">
                                <button className={styles.DoneBtn}>Done</button>
                                <button className={styles.DeleteBtn}>Delete</button>
                                <button className={styles.EditBtn}>Edit</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12 col-md-4">
                    <Card className={styles.Card}>
                        <Card.Body>
                            <h2 className={styles.TaskTitle}>Task Title</h2>
                            <div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            <div className="d-flex">
                                <button className={styles.DoneBtn}>Done</button>
                                <button className={styles.DeleteBtn}>Delete</button>
                                <button className={styles.EditBtn}>Edit</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    )
}
