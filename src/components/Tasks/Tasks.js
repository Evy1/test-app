import React, { useState, useEffect, useRef } from "react";
import { Card, Container, Modal, Button } from "react-bootstrap";
import styles from "./Tasks.module.css";
import { useAuth } from "../../context/AuthContext";
import Buttons from "../Buttons/Buttons";
import firebase from "../../firebase";
import Spinner from "../Spiner/Spiner";

function Tasks() {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                      <Buttons class={styles.EditBtn} click={handleShow}>
                        Edit
                      </Buttons>
                    </div>
                  </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} key={result.id}>
                  <Modal.Header closeButton>
                    <Modal.Title>{result.content}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{result.content}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )
        )}
      </div>
    );
  }
  return <Container>{info}</Container>;
}
export default Tasks;
