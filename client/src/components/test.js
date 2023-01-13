import React, { useEffect, useState } from "react";
import "./Topic.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Topic() {
  const navigate = useNavigate();
  const [state, setState] = useState(-1);
  const name = localStorage.getItem("name");
  const [count, setCount] = useState(0);
  const [box, setBox] = useState({ isOn: false });
  const [model, setModel] = useState({ isOpen: false });
  const [list, setList] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [color, setColor] = useState({ name: "" });

  const changeColor = (e) => {
    setColor(e.target.name);
    if (e.target.name === "green") {
      setCount(count + 4);
    }
    if (e.target.name === "yellow") {
      setCount(count + 3);
    }
    if (e.target.name === "blue") {
      setCount(count + 2);
    }
    if (e.target.name === "red") {
      setCount(count + 1);
    }
    setBox({ isOn: false });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value, name });
  };

  const closeModal = () => {
    axios
      .post("http://localhost:8000/api/v1/topic", data)
      .then((res) => console.log(res.data));
    setModel({ isOpen: false });
  };

  const open = () => {
    setBox({ isOn: true });
  };
  const close = () => {
    setBox({ isOn: false });
  };

  const finalSubmit = () => {
    const percentage = Math.round((count / ((state + 1) * 4)) * 100);
    console.log(percentage);
    setData({ ...data, percentage });
  };

  const Submit = () => {
    if (data.title === "" && data.description === "")
      return alert("fill details");
    let res = data.description.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    setList(res);
    setModel({ isOpen: true });
  };

  useEffect(() => {
    closeModal();
  }, []);
  //
  return (
    <>
      <div className="user2">
        <div className="box2">
          <h1>ADD TOPIC</h1>

          <div className="Topic">
            <div className="title">
              <label>Topic : </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Topic"
                onChange={handleChange}
              />
            </div>
            <div className="description">
              <h5>Description</h5>
              <textarea
                type="text"
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className=" btn2 " onClick={Submit}>
            Check
          </button>
          <Modal show={model.isOpen} onHide={closeModal} class="bg-warning">
            <Modal.Header>
              <Modal.Title>{data.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="change">
                {list.map((item, ind) => (
                  <label key={ind}>
                    <span
                      className="span"
                      style={{ color: state === ind ? color : "black" }}
                      onClick={() => {
                        setState(ind, open());
                      }}
                    >
                      {item},
                    </span>
                  </label>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={finalSubmit}>
                Final Submit
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Modal show={box.isOn} onHide={close} className="bg-warning">
        <Modal.Header closeButton>
          <Modal.Title>Call Action</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="button1">
            <button
              type="submit"
              name="green"
              style={{ backgroundColor: "green" }}
              onClick={changeColor}
            >
              Understood
            </button>
            <button
              type="submit"
              name="yellow"
              style={{ backgroundColor: "yellow" }}
              onClick={changeColor}
            >
              Somewhat Understood
            </button>
            <button
              type="submit"
              name="blue"
              style={{ backgroundColor: "lightblue" }}
              onClick={changeColor}
            >
              Not Clear
            </button>
            <button
              type="submit"
              name="red"
              style={{ backgroundColor: "red" }}
              onClick={changeColor}
            >
              What Rubbish
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Topic;
