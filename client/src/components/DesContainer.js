import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userSelectedTopic, FIND_TOPIC_DISCRIPTION } from "../API/api";

const DesContaioner = () => {
  const [boolean, setBoolean] = useState(false);
  const [description, setDescription] = useState([]);
  const [desId, setDesId] = useState("");

  const { id, title } = useParams();
  const navigate = useNavigate();

  // console.log(desId, 78);

  const Color = {
    0: "red",
    3: "green",
    2: "yellow",
    1: "blue",
  };

  useEffect(() => {
    axios.get(`${FIND_TOPIC_DISCRIPTION}/${id}/?title=${title}`).then((res) => {
      console.log(res.data.Topic[0].description, "gsgsgsggdggdg");
      setDescription(res.data.Topic[0].description);
    });
  }, []);

  const colorChange = (e) => {
    axios
      .put(
        `${userSelectedTopic}/${id}?title=${title}&desc_id=${desId}&value=${e.target.value}`
      )
      .then((res) => {
        console.log(res.data, "gsgsgsggdggdg");
        console.log("success", "🔥");
      })
      .catch((err) => console.log(err.message));
    setBoolean(!boolean);
  };

  return (
    <>
      <div className=" description-container ">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            width: "500px",
            border: "2px solid red",
            margin: "auto",
            marginTop: "10vh",
            borderRadius: "10px",
            padding: "8px",
          }}
        >
          <div>
            <label className="title">{title}</label>
          </div>
          {description.map((item, index) => (
            <span
              onClick={() => {
                setBoolean(!boolean);
                setDesId(item._id);
              }}
              style={{ color: Color[item.value] }}
              className="word"
              key={index}
            >
              {item.word}
            </span>
          ))}
          {boolean && (
            <div className="pop-up">
              <button
                className="blue"
                onClick={(e) => colorChange(e)}
                value={1}
              >
                Not Clear
              </button>
              <button
                className="yellow"
                onClick={(e) => colorChange(e)}
                value={2}
              >
                Some Understood
              </button>
              <button
                className="green"
                value={3}
                onClick={(e) => colorChange(e)}
              >
                Understood
              </button>
              <button className="red" value={0} onClick={(e) => colorChange(e)}>
                Not Understood
              </button>
            </div>
          )}
          <button className="btn" onClick={() => navigate(`/userdetail/${id}`)}>
            Back to all topics
          </button>
        </div>
      </div>
    </>
  );
};

export default DesContaioner;
