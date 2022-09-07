import React, { useState, useEffect } from 'react'
import { onSnapshot, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebaseApi'

function Event({eventId, name, location}) {
  const [birds, setBirds] = useState([])

  useEffect(() => {
    const getBirds = async () => {
      if(eventId) {
        onSnapshot(collection(db, `events/${eventId}/birds`), (snapshot) => {
          setBirds(snapshot.docs.map((doc) => ({
            id: doc.id,
            bird: doc.data()
          })))
        })
        
      }
    }

    getBirds()
    console.log(birds)
  }, []);

  const handleOnClick = async (e) => {
    e.preventDefault()
    addDoc(collection(db, `events/${eventId}/birds`), {
      owner: 'Tetet',
      tagID: '123456',
      ringNumber: 'AB12CD34'
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    deleteDoc(doc(db, `events/${eventId}/birds`, '5ajeLlshT2V2Z3b6E929'))
  }

  return (
    <div>
      <h1>{name}</h1>
      <h1>{location}</h1>
      {birds.map(({id, bird}) => (
        <div key={id}>
          <p>doc id: {id}</p>
          <p>Owner: {bird.owner}</p>
          <p>tagId: {bird.tagID}</p>
          <p>ringNumber: {bird.ringNumber}</p>
        </div>
      ))}

      <button className='bg-yellow-200 py-1 px-2 border border-black rounded-full' onClick={handleOnClick}>Click me to addDoc</button><br/>
      <button className='bg-yellow-200 py-1 px-2 border border-black rounded-full' onClick={handleDelete}>Click me to deleteDoc</button>
    </div>
  )
}

export default Event