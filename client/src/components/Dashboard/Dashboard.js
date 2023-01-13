import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contex/appContext";
import { addTopic, FIND_ONE_USER } from "../../API/api";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { users } = useAppContext();
  const [single, setSingle] = useState("");
  console.log(users, "gsgsgsg");

  const [topic, setTopic] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const changeEvent = (e) => {
    axios.get(`${FIND_ONE_USER}/${e.target.value}`).then((res) => {
      // console.log(res.data);
      setSingle(res.data._id);
    });
  };

  const userUpdate = (e) => {
    const { title, description } = topic;
    if ((title, description)) {
      const url = `${addTopic}/${single}`;
      axios({
        method: "post",

        url: url,

        data: {
          title: title,
          description: description,
        },
      }).then((response) => {
        // alert("Topic Saved");
        // console.log("Changed");
        console.log(response.data, "abrakadabra");
        localStorage.setItem("token", response.data.token);
      });
    } else {
      console.log("User Id wrong");
    }
    // e.preventDefault();
  };

  //================================================

  // const finalSubmit = () => {
  //   const percentage = Math.round((count / ((state + 1) * 4)) * 100);
  //   console.log(percentage);
  //   setTopic({ ...topic, percentage });
  // };

  return (
    <div className="dashboard-container">
      <div className="moadal-btn">
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️Back
        </button>
        <div>
          {/* Button trigger modal  */}
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add New Topics
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Topics
                  </h5>
                </div>
                <select className="btn" onChange={changeEvent}>
                  <option value="0">--Select User--</option>
                  {users.map((user, ind) => (
                    <option key={ind} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <div className="modal-body">
                  <h2>Topic</h2>
                  <form onSubmit={userUpdate}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        value={topic.title}
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Topic Title"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="description"
                        onChange={handleChange}
                        value={topic.description}
                        placeholder="Write About The Topic..."
                        rows="3"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>Topic List </h3>
        <div>
          <div>
            <table className="table  table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, ind) => (
                  <tr key={ind}>
                    <th scope="row">➡️</th>
                    <td
                      onClick={() => navigate(`/userdetail/${user._id}`)}
                      className="user"
                    >
                      {user._id}
                    </td>
                    <td>{user.name}</td>
                    {user.topics.map((item, ind) => (
                      <td key={ind}>{item.title}</td>
                    ))}
                    <td>{user.percent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
