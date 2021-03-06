const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note')
})

router.post('/notes/new-note', async (req, res) => {
    const {title, description} = req.body
    const errors = []
    if(!title) {
        errors.push({text: "Por fovor ingrese un título"})
    }
    if(!description) {
        errors.push({text: "Por favor ingrese una descripción"})
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    }
    else {
        const newNote = new Note({title, description})
        await newNote.save()
        res.redirect('/notes')
    }
})

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'}).lean()
    res.render('notes/all-notes', {notes})
})

module.exports = router