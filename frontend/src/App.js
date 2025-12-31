import React from "react";
import Editor from "./components/Editor";

function App() {
  const docId = "12345"; // This can be replaced with MongoDB document _id later

  return (
    <div>
      <h1>Real-Time Collaborative Editor</h1>
      <Editor docId={docId} />
    </div>
  );
}

export default App;
