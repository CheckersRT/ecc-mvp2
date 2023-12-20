import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'


export default function Home() {

async function callApi(inputText) {
  const response = await fetch("/api/getInfo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputText }),
  })

  const data = await response.json();
  console.log(data)
  const { output } = data;
  console.log("OpenAI replied...", output)

}

function handleSubmitText(event) {
  event.preventDefault()
  const formElements = event.target.elements;
  const inputText = formElements.inputText.value
  console.log(inputText)
  callApi(inputText)
}

function handleSubmitFile(event) {
  event.preventDefault()
  const formElements = event.target.elements;
  const fileUpload = formElements.fileUpload.files
  console.log(fileUpload)
}

  return (
    <>
      <h1>Get Info From Text</h1>
      <form 
      // onSubmit={handleSubmitText}
      onSubmit={handleSubmitFile}
      >
        <label htmlFor="inputText">Insert Text</label>
        <input type='text' name="inputText" id="inputText"></input>
        <label htmlFor='fileUpload'></label>
        <input type="file" name='fileUpload' id='fileUpload'></input>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
