import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Editor({ docId }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join-document", docId);

    socket.on("receive-changes", (data) => {
      setContent(data);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, [docId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit("send-changes", value);
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default Editor;
