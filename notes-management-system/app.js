const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Sample Notes Data with enhanced properties
let notes = [
    {
        noteTitle: "Meeting Notes",
        noteContent: "Discussed project requirements and deadlines",
        noteCategory: "Work",
        noteStatus: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false
    },
    {
        noteTitle: "Shopping List",
        noteContent: "Milk, Eggs, Bread, Fruits",
        noteCategory: "Personal",
        noteStatus: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false
    }
];

// Middleware
app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files

// Home Route - Display Notes
app.get("/", (req, res) => {
    const searchTerm = req.query.search || "";
    let filteredNotes = notes;
    
    if (searchTerm) {
        filteredNotes = notes.filter(note => 
            note.noteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.noteContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.noteCategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    res.render("home", { data: filteredNotes, searchTerm: searchTerm });
});

// Add Note Route
app.post("/add", (req, res) => {
    const newNote = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteCategory: req.body.noteCategory,
        noteStatus: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPinned: false
    };

    notes.push(newNote);
    res.redirect("/");
});

// Edit Note Form Route
app.get("/edit/:title", (req, res) => {
    const noteTitle = req.params.title;
    const note = notes.find(note => note.noteTitle === noteTitle);
    
    if (note) {
        res.render("edit", { note: note });
    } else {
        res.redirect("/");
    }
});

// Update Note Route
app.post("/edit/:title", (req, res) => {
    const originalTitle = req.params.title;
    const updatedNote = {
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteCategory: req.body.noteCategory,
        noteStatus: req.body.noteStatus,
        createdAt: req.body.createdAt, // Keep original creation date
        updatedAt: new Date().toISOString(), // Update modification date
        isPinned: req.body.isPinned === "on"
    };

    notes = notes.map(note => 
        note.noteTitle === originalTitle ? updatedNote : note
    );
    
    res.redirect("/");
});

// Archive Note Route
app.post("/archive", (req, res) => {
    const requestedNoteTitle = req.body.noteTitle;
    notes.forEach(note => {
        if (note.noteTitle === requestedNoteTitle) {
            note.noteStatus = "Archived";
            note.updatedAt = new Date().toISOString();
        }
    });
    res.redirect("/");
});

// Unarchive Note Route
app.post("/unarchive", (req, res) => {
    const requestedNoteTitle = req.body.noteTitle;
    notes.forEach(note => {
        if (note.noteTitle === requestedNoteTitle) {
            note.noteStatus = "Active";
            note.updatedAt = new Date().toISOString();
        }
    });
    res.redirect("/");
});

// Pin/Unpin Note Route
app.post("/pin", (req, res) => {
    const requestedNoteTitle = req.body.noteTitle;
    notes.forEach(note => {
        if (note.noteTitle === requestedNoteTitle) {
            note.isPinned = !note.isPinned;
            note.updatedAt = new Date().toISOString();
        }
    });
    res.redirect("/");
});

// Delete Note Route
app.post("/delete", (req, res) => {
    const requestedNoteTitle = req.body.noteTitle;
    notes = notes.filter(note => note.noteTitle !== requestedNoteTitle);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});