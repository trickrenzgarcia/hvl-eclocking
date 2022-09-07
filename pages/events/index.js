import Link from 'next/link'
import React from 'react'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/events')
  const events = await res.json()

  return {
    props: { events }
  }
}

function index({ events }) {
  return (
    <div>
      <h1>Events</h1>
      {events.map(({ids, event}) => (
        <Link href={'/events/' + ids} key={ids}>
          <a>
            <div>
              <h1>name: {event.name}</h1>
              <h1>location: {event.location}</h1>
            </div>
          </a>
        </Link>
      ))}

      <Link href='/events/create'><a>Create Event</a></Link>
    </div>
  )
}

export default index