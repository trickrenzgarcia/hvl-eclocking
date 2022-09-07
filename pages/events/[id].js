import { db } from "../../firebase/firebaseApi"
import { collection, query, getDocs } from "firebase/firestore"

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/events')

  const events = await res.json()

  const paths = events.map((event) => ({
    params: { id: event.ids},
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const res = await fetch('http://localhost:3000/api/events/' + id)

  const events = await res.json()

  //get Birds
  const q = query(collection(db, `events/${id}/birds`))
  const snap = await getDocs(q)
  const birds = snap.docs.map((doc) => ({
    ids: doc.id,
    ...doc.data()
  }))

  return {
    props: { events, birds }
  }
}

const EventItem = ({ events, birds }) => {
  return (
    <div>
      <p>name: {events.name}</p>
      <p>location: {events.location}</p>
      {birds.map(bird => (
        <div key={bird.ids}>
          <p>owner: {bird.owner}</p>
          <p>ringNumber: {bird.ringNumber}</p>
          <p>tagID: {bird.tagID}</p>
        </div>
      ))}
    </div>
  )
}

export default EventItem