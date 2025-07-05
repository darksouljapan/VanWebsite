import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore/lite"

/*
// by adding lite at the end, we are calling a lite version of this firestore, because firestore includes real-time database features also which we don't require right now
*/

/*
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
*/
const firebaseConfig = {
  apiKey: "AIzaSyB9pITsNMwaUkSMSlPPQL7nmpMjNKd7p1o",
  authDomain: "vanlife-f2fab.firebaseapp.com",
  projectId: "vanlife-f2fab",
  storageBucket: "vanlife-f2fab.firebasestorage.app",
  messagingSenderId: "420262898712",
  appId: "1:420262898712:web:b3f8b9d2c7b6a81189e76d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// Refactoring the fetching function below
// below is the reference structure of what we are looking for or something???
// below saving it within a snapshot which is using getDocs method and using vanscollectionref

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = getDocs(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }


}

/*
// Commenting for now, for refering later

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
*/

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}