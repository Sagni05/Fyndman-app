import React from "react";
import "../../App.css";
import { useAppContext } from "../contex/appContext";

const Navbar = () => {
  // const { setQuery } = useAppContext();

  return (
    <div className="navbar">
      <h1>Fyndman Board</h1>
      {/* <div className="search-btn">
        <input
          type="text"
          placeholder="Search Users here..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div> */}
    </div>
  );
};

export default Navbar;
