import { useEffect, useState } from "react";
import axios from "./Components/api";
import UserList from "./Components/UserList";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="App">
      <UserList userData={data} />
    </div>
  );
}

export default App;
