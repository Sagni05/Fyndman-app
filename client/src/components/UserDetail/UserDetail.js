import axios from "axios";
import "../../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_ALL_USER, addTopic, FIND_ONE_USER } from "../../API/api";

const UserDetail = () => {
  const [user, setUser] = useState({});
  const [single, setSingle] = useState(null);
  const [topic, setTopic] = useState({
    title: "",
    description: "",
  });

  console.log(user, 4545);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`${FIND_ONE_USER}/${id}`).then((res) => {
      console.log(res.data, "gsgsgsggdggdg");
      setUser(res.data.topics);
      setSingle(res.data.name);
    });
  }, []);

  const userUpdate = (e) => {
    const { title, description } = topic;
    if ((title, description)) {
      const url = `${addTopic}/${id}`;
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
    e.preventDefault();
  };

  // const changeTopicDetails = (e) => {
  //   let finalTopic = user.find(
  //     (res) => res.title === e.target.innerText
  //   ).description;
  //   setDescription(finalTopic);
  // };

  return (
    <div className="main ">
      <div className=" moadal-btn">
        <button className="btn" onClick={() => navigate("/")}>
          ⬅️Back
        </button>
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
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th colSpan="2" scope="col">
              {single}
            </th>
          </tr>
          <tr>
            <th scope="col">Topics</th>
            <th scope="col">Percentage</th>
          </tr>
          {Object.values(user).map((item, ind) => (
            <tr key={ind}>
              <td
                className="title"
                onClick={() => navigate(`/desContaioner/${id}/${item.title}`)}
              >
                {item.title}
              </td>
              <td>{item.percent}</td>
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default UserDetail;
