import React, { useState, useEffect, useRef } from "react";
import { Card, Container, Modal, Button } from "react-bootstrap";
import styles from "./Tasks.module.css";
import { useAuth } from "../../context/AuthContext";
import Buttons from "../Buttons/Buttons";
import firebase from "../../firebase";
import Spinner from "../Spiner/Spiner";
import classes from "./Modal.module.css";
import { useForm } from '../../utils/useForm'

function Tasks() {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([]);
  const [content, setContent] = useState([]);
  const [modal, setModal] = useState([]);
  const [date, setDate] = useState();
  const [touched, setTouched] = useState(false);
  // const form = useForm({
  //   values: {},
  //   onSubmit: (values, props) => {
  //     // firebase
  //     //   .database()
  //     //   .ref("task/" + id)
  //     //   .update({ title: value, content: content, date: date });
  //   }
  // });

  // form.handleSubmit();
  // form.setValue(name, value);
  // form.getValue(name);

  const handleClose = () => {
    setShow(false);
    setTouched(false)
  }

  //showing modal with the current content to edit
  //data is pased from result in items iteration
  const handleShow = (data) => {
    setShow(true);
    setModal(data);
    setValue(data.title);
    setContent(data.content);
    setDate(data.date);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref("task")
      .on("value", (snapshot) => {
        const fetchedResults = [];
        if (snapshot) {
          snapshot.forEach((snap) => {
            fetchedResults.push({
              ...snap.val(),
              id: snap.key,
            });
          });
          setItems(fetchedResults);
          setLoading(false);
        } else {
          return;
        }
      });
    return unsubscribe;
  }, []);



  //edit method
  //id passed from modal id
  const editTaskHandler = (id) => {
    firebase
      .database()
      .ref("task/" + id)
      .update({ title: value, content: content, date: date });
  };
  //handle change in title
  const titleHandler= (e) =>{
    e.preventDefault();
    setValue(e.target.value);
    setTouched(true)
  }
  //handle change in content of task
  const contentHandler = (e) =>{
    e.preventDefault();
    setContent(e.target.value);
    setTouched(true)
  } 
  //handle change in date
  const dateHandler = (e)=>{
    e.preventDefault()
    setDate(e.target.value)
    setTouched(true)
  }
  //delete method
  function deleteItem(id) {
    const db = firebase.database().ref("task/" + id);
    db.remove();
  }


  let info = <Spinner />;
  if (!loading) {
    info = (
      <div className="row d-flex justify-content-center text-center pt-4">
        {items.map(
          (result) =>
            result.user === currentUser.uid && (
              <div className="col-12 col-md-4" key={result.id}>
                <Card className={styles.Card}>
                  <Card.Body>
                    <div>{result.date}</div>
                    <h2 className={styles.TaskTitle}>{result.title}</h2>
                    <div>
                      <p>{result.content}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Buttons
                        click={() =>
                          firebase
                            .database()
                            .ref("task/" + result.id)
                            .update({ status: "done" })
                        }
                        class={styles.DoneBtn}
                        disable={result.status === "done"}
                      >
                        Done
                      </Buttons>
                      <Buttons
                        click={() => deleteItem(result.id)}
                        class={styles.DeleteBtn}
                      >
                        Delete
                      </Buttons>
                      <Buttons
                        class={styles.EditBtn}
                        click={() => handleShow(result)}
                      >
                        Edit
                      </Buttons>
                    </div>
                  </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton className={classes.Header}>
                    <Modal.Title className={classes.Title}>
                      Edit Task
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className={classes.Body}>
                    <form
                      onSubmit={() => editTaskHandler(modal.id)}
                      className="d-flex justify-content-center flex-column"
                    >
                      <label className={classes.Label}>Task Title</label>
                      <input
                        className={classes.Input}
                        type="text"
                        required
                        placeholder="Enter the new title..."
                        // value={form.getValue('title')}
                        value={value}
                        onChange={titleHandler}
                        // onChange={e => form.setValue('title', e.target.value)}
                      ></input>
                      <label className={classes.Label}>Task Content</label>
                      <textarea
                        className={classes.Input}
                        type="textarea"
                        rows={3}
                        required
                        placeholder="Enter new description..."
                        value={[content]}
                        onChange={contentHandler}
                      />
                      <label className={classes.Label}>Task Deadline</label>
                      <input
                        className={classes.Input}
                        type="datetime-local"
                        value={[date]}
                        onChange={dateHandler}
                      ></input>
                      <Button
                        type="submit"
                        variant="primary"
                        className={classes.Button}
                        disabled = {!touched}
                      >
                        Save Changes
                      </Button>
                      <Button
                        className={classes.CancelBtn}
                        variant="secondary"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </form>
                  </Modal.Body>
                  <Modal.Footer className={classes.Body}></Modal.Footer>
                </Modal>
              </div>
            ) 
        )}
      </div>
    );
  }
  return <Container>
          <h1 className="text-center mt-4">Your Tasks...</h1>
            {info}
          </Container>;
}
export default Tasks;


