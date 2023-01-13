import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { GET_ALL_USER } from "../../API/api";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Appcontext must be within appContextProvider");
  }

  return context;
};

const AppContexProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // console.log(users, "usersss");

  useEffect(() => {
    axios
      .get(GET_ALL_USER)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => err);
  }, []);

  // search functionalty
  // const searchUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(query)
  // );

  return (
    <AppContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContexProvider;
