import React, { useState } from "react";
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";
import { CREATE_NEW_USER } from "../../API/api";
import axios from "axios";
import styles from "./styles.module.css";

const Signup = () => {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mail: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();
    const { name, mail } = user;
    if ((name, mail)) {
      const url = CREATE_NEW_USER;
      axios({
        method: "post",

        url: url,

        data: {
          name: name,

          mail: mail,
        },
      })
        .then((response) => {
          alert("User Added");
          localStorage.setItem("token", response.data.token);
          navigate("/UsersDashboard");
        })
        .catch((err) => {
          console.log("somthing wrong", err);
        });
    }
  };

  return (
    <div className="main">
      <div className={styles.Signup_container}>
        <div className={styles.Signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/">
              <button type="button" className={styles.white_btn}>
                Sign In
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form
              className={styles.form_container}
              onSubmit={(e) => createUser(e)}
            >
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={user.name}
                onChange={registerUser}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="mail"
                value={user.mail}
                onChange={registerUser}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
