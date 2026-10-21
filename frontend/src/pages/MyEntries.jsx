import { getMyEntries } from "../services/entryService"
import { useState, useEffect } from "react"

function MyEntries() {

    const [entries, setEntries] = useState([])

    async function getEntries(){
        const response = await getMyEntries()
        setEntries(response)
    }

    useEffect(()=>{
        getEntries()
    },[])

  return (
    <>
        <h1>My Entries</h1>
        {entries.map((oneEntry)=>
        <div>
            <h2>Title: {oneEntry.title}</h2>
        </div>
        )}
    </>
  )
}

export default MyEntries