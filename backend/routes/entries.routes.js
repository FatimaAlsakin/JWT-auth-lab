const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken')
const Entry = require('../models/Entry')

router.post('/', verifyToken, async(req,res)=>{

    try{

    const newEntry = await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic:  req.body.isPublic,
        owner: req.user._id
    })
    res.status(201).json(newEntry)
    }catch(err){
        console.log(err)
    }
})

router.get('/all-entries', async(req,res)=>{
    try{
    const allEntries = await Entry.find({isPublic: true})
    res.status(200).json(allEntries)
    }catch(err){
        console.log(err)
    }
})

router.get('/my-entries',verifyToken, async(req,res)=>{
    try{
    const allEntries = await Entry.find({owner: req.user._id})
    res.status(200).json(allEntries)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:eId', verifyToken, async(req,res)=>{
    try{
        let deletedEntry = await Entry.findById(req.params.eId)

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' })
        }

        if (!deletedEntry.owner.equals(req.user._id))
            return res.status(403).json({
                message: "Unautharized"
            })
        deletedEntry = await Entry.findByIdAndDelete(req.params.eId)
        res.status(200).json(deletedEntry)
    }catch(err){
        console.log(err)
    }
    
})

router.put('/:eId', verifyToken, async(req,res)=>{
    try{
        let updatedEntry = await Entry.findById(req.params.eId)

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' })
        }

        if (!updatedEntry.owner.equals(req.user._id))
            return res.status(403).json({
                message: "Unautharized"
            })
        updatedEntry = await Entry.findByIdAndUpdate(req.params.eId, {
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic:  req.body.isPublic,
        } , { new: true })
        res.status(200).json(updatedEntry)
    }catch(err){
        console.log(err)
    }
    
})


module.exports = router;
