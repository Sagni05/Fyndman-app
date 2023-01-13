import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import styles from "./styles.module.css";
import { SEARCH_BY_NAME } from "../../API/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const getUser = (e) => {
    const { name } = user;
    if (name) {
      const url = `${SEARCH_BY_NAME}/${name}`;
      axios({
        method: "post",

        url: url,

        data: {
          name: name,
        },
      }).then((response) => {
        console.log("signed in");
        localStorage.setItem("token", response.data.token);
        navigate(`/userdetail/${response.data._id}`);
      });
    } else {
      console.log("User Id wrong");
    }
    e.preventDefault();
  };

  // useEffect(() => {
  //   const { name } = user;
  //   if (name) {
  //     const url = `${SEARCH_BY_NAME}/${name}`;
  //     axios({
  //       method: "post",

  //       url: url,

  //       data: {
  //         name: name,
  //       },
  //     }).then((response) => {
  //       console.log(response.data);
  //       localStorage.setItem("token", response.data.token);
  //       // navigate(`//userdetail/${_id}`);
  //     });
  //   } else {
  //     console.log("User Id wrong");
  //   }
  // }, []);

  return (
    <div className="main">
      <div className={styles.Login_container}>
        <div className={styles.Login_form_container}>
          <div className={styles.left}>
            <form
              className={styles.form_container}
              onSubmit={(e) => getUser(e)}
            >
              <h1>Login to Your Account</h1>
              <input
                type="text"
                placeholder="Enter Resistered Name"
                name="name"
                onChange={handleChange}
                value={user.name}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.green_btn}>
                Submit
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New User ?</h1>
            <button
              type="button"
              className={styles.white_btn}
              onClick={() => navigate("/signup")}
            >
              Register Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
