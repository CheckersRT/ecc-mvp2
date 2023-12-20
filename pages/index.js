import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState();
  const [text, setText] = useState("");
  const [output, setOutput] = useState();
  const [fileName, setFileName] = useState();

  async function callExtractText(fileName) {
    try {
      const response = await fetch("/api/extractText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("data back from vision api: ", data);
      const { text } = data;
      console.log("Google vision replied with: ", text);
      setText(text);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  callExtractText("public/IMG_7482.jpg");

  async function callGetInfo(text) {
    if (text === "") return;

    const response = await fetch("/api/getInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    console.log(data);
    const { output } = data;
    console.log("OpenAI replied...", output);
    setOutput(output)
  }

  // function handleSubmit() {
  //   callExtractText();
  // }

  useEffect(() => {
    callExtractText(fileName);
  }, [fileName]);

  useEffect(() => {
    callGetInfo(text);
  }, [text]);

  function handleSubmitText(event) {
    event.preventDefault();
    const formElements = event.target.elements;
    const inputText = formElements.inputText.value;
    console.log(inputText);
    callGetInfo(inputText);
  }

  // async function handleSubmitFile(event) {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.set("file", file);

  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   const { name } = data;
  //   console.log("OpenAI replied...", name);
  // }

  return (
    <>
      <h1>Get Info From Text</h1>
      <form
      onSubmit={() => setFileName("hdllo")}
      // onSubmit={handleSubmitText}
      >
        <label htmlFor="inputText">Insert Text</label>
        <input type="text" name="inputText" id="inputText"></input>
        <label htmlFor="fileUpload"></label>
        <input
          type="file"
          name="fileUpload"
          id="fileUpload"
          // onChange={(event) => setFile(event.target.files[0])}
        ></input>
        <button type="submit">Submit</button>
        {/* <p>{text ? text : null}</p> */}
        <p>{output ? output : null}</p>
      </form>
    </>
  );
}
