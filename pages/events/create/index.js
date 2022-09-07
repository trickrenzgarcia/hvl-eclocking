import React, { useState } from 'react'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseApi'

const Create = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const handleCreate = async (e) => {
      e.preventDefault()
      await addDoc(collection(db, 'events'), {
        name: name,
        location: location
      })
  
      setName('')
      setLocation('')
  }

  return (
    <div>
      <h1>Create Event</h1>
      <form>
        <label>Name: </label>
        <input className='bg-white border border-gray-500' type="text" onChange={(e) => setName(e.target.value)} value={name}/><br/>
        <label>Location: </label>
        <input className='bg-white border border-gray-500' type="text" onChange={(e) => setLocation(e.target.value)} value={location}/><br/>
        <button onClick={handleCreate} type="submit">Create Event</button>
      </form>
    </div>
  )
}

export default Create