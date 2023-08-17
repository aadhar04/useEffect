import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [resourceType, setResourceType] = useState("Posts");
  const [items, setItems] = useState([]);

  //mounting and unmounting using useEffect
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    //unmounting life cycle operation
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
    console.log("useEffect called!!");
  }, [resourceType]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setResourceType("posts");
        }}
      >
        {" "}
        Posts{" "}
      </button>
      <button
        onClick={() => {
          setResourceType("users");
        }}
      >
        Users
      </button>
      <button
        onClick={() => {
          setResourceType("comments");
        }}
      >
        Comments
      </button>

      <h1>{resourceType}</h1>
      {items.map((item) => (
        <pre>{JSON.stringify(item)}</pre>
      ))}

      <h1>{windowWidth}</h1>
    </div>
  );
}
