import api from "./api";

async function createNewEntry(entryBody) {
    const response = await api.post('/entries', entryBody)
    return response.data    
}

async function getAllPublicEntries() {
    const response = await api.get('/entries/all-entries')
    return response.data    
}

async function getMyEntries() {
    const response = await api.get('/entries/my-entries')
    return response.data    
}

export {
    createNewEntry,
    getAllPublicEntries,
    getMyEntries
}