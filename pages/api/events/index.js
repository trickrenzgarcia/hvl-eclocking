import { db } from "../../../firebase/firebaseApi"
import { collection, getDocs, query, onSnapshot } from "firebase/firestore"

export default async (req, res) => {
  try {
    const { id } = req.body
    const event = query(collection(db, 'events'))
    const snapshot = await getDocs(event)
    const eventData = snapshot.docs.map((doc) => ({
      ids: doc.id,
      event: doc.data()
    }))
    
    if(eventData.some(event => event.ids === id)){

    } else {
      console.log("hello")
      res.status(200).json(eventData)
    }
  }
  catch(error){
    console.log(error)
  }
  res.status(200).json()
  
}