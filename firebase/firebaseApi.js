import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCXghPoPbC8zYBS7RU_zSByYzhrDl3ED8M",
  authDomain: "hvl-eclocking.firebaseapp.com",
  projectId: "hvl-eclocking",
  storageBucket: "hvl-eclocking.appspot.com",
  messagingSenderId: "519998960997",
  appId: "1:519998960997:web:77370f9f9222c8150e9d8c"
}

initializeApp(firebaseConfig)

const db = getFirestore()

export { db }
