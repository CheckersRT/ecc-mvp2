import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'


export default function Home() {

const [file, setFile] = useState()

console.log(file)

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

async function handleSubmitFile(event) {
  event.preventDefault()
  const formData = new FormData()
  formData.set('file', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  const data = await response.json();
  console.log(data)
  const { name } = data;
  console.log("OpenAI replied...", name)
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
        <input type="file" name='fileUpload' id='fileUpload' onChange={(event) => setFile(event.target.files[0])}></input>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
