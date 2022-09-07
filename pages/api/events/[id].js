import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseApi'

export default async function eventsHandler(req, res) {
  const { id, name, location } = req.query

  try {
    if(req.method === 'PUT') {
      await updateDoc(doc(db, "events", id), {
        name: name,
        location: location
      })
    } else if(req.method === 'GET') {
      const docRef = doc(db, "events", id)
      const docSnapshot = await getDoc(docRef)
      if(!docSnapshot.exists) {
        res.status(404).end()
      } else {
        res.status(200).json(docSnapshot.data())
      }
    } else if(req.method === 'DELETE') {
      await deleteDoc(doc(db, "events", id))
    }
    res.status(200).end()
  }
  catch (error) {
    res.status(400).end()
  }

}