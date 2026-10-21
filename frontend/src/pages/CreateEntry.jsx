import { createNewEntry } from "../services/entryService"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

function CreateEntry() {

    const [formData, setFormData] = useState({
        title: '',
        entryBody: '',
        isPublic:false
    })

    const navigate = useNavigate()

    async function createEntry(){
        const response = await createNewEntry()
        setFormData(response)
        navigate('/my-entries')
    }

    useEffect(()=>{
        createEntry()
    },[])

function handleChange(event) {
  const { name, type, value, checked } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}
    
    async function handleSubmit(event) {
        event.preventDefault()
    
        console.log('sjbkdd')
        const response = await createNewEntry(formData)
        navigate('/my-entries')
    }


  return (
    <>
        <h1>Create Entry</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" onChange={handleChange} id="title" />
            <label htmlFor="entryBody">Entry Body: </label>
            <input type="text" name="entryBody" onChange={handleChange} id="entryBody"  />
            <label htmlFor="isPublic">Is Public: </label>
            <input type="checkbox" name="isPublic" onChange={handleChange} id="isPublic" />
            <button>create</button>
        </form>
    </>
  )
}

export default CreateEntry