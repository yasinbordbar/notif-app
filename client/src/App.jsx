import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card/Card.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { posts } from "./data.js";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setUser(username);
    }
  };

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
          <p onClick={()=>window.location.reload()} className="logout">Logout</p>
        </>
      ) : (
        <div className="login">
          <h2>Notif App</h2>
          <input
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleEnter}

          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
