import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import results from "../results";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import styles from "./TaskForm.module.css";
import { useAuth } from "../../context/AuthContext";
import firebase from "../../firebase";
import { useFormik } from 'formik';

function TaskForm() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const postHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      content: content,
      date: date,
      user: currentUser.uid,
      status: "pending",
    };
    firebase
      .database()
      .ref('task')
      .push(data)
      .then(() => {
        setMessage("Task was recorded");
        setTitle("");
        setContent("");
        setDate("");
      })
      .catch((error) => {
        setError("Task couldnt register ");
      });
  };
  return (
    <>
      <Dashboard />
      <Container>
        <div className="row py-4 justify-content-center">
          <h2>Add a new task here</h2>
        </div>
        <div className="row">
          <form onSubmit={postHandler} className={styles.Form}>
            {message && <div className={styles.Success}>{message}</div>}
            {error && <div className={styles.Failed}>{error}</div>}
            <Form.Group
              id="title"
              className="d-flex justify-content-center flex-column text-center"
            >
              <label>Task Title</label>
              <input
                className={styles.Input}
                type="text"
                required
                placeholder="Title"
                value={[title]}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              id="content"
              className="d-flex justify-content-center flex-column text-center"
            >
              <label>Task Content</label>
              <textarea
                className={styles.Input}
                type="textarea"
                rows={3}
                required
                placeholder="Task"
                value={[content]}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              id="date"
              className="d-flex justify-content-center flex-column text-center"
            >
              <label>Pick a deadline</label>
              <input
                className={styles.Input}
                type="datetime-local"
                value={[date]}
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </Form.Group>
            <div>
              <Button type="submit">Submit</Button>
              <Link className="btn-primary p-2 ml-4" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
export default TaskForm;
