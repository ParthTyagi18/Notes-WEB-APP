import Note from "../model/Note.js"

export async function getAllNotes (_,res){
    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error occured at getALLNotes Controller :",error);
        res.status(500).json({message:"Server side error occured!!"});
    }   
}

export async function getNoteById (req,res){
    try{
        const note = await Note.findById(req.params.id);

        if(!note) return res.status(404).json({message:"Note not found"});

        res.status(200).json(note);
    }
    catch(error){
        console.error("Error occured at getNoteById Controller :",error);
        res.status(500).json({message:"Server side error occured!!"});
    }
}

export async function createNote (req,res){
    try{
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        const note = await newNote.save();
        res.status(201).json(note);
    }
    catch(error){
        console.error("Error occured at createNote Controller :",error);
        res.status(500).json({message:"Server side error occured!!"});
    }
}

export async function updateNote (req,res){
    try{
        const {title,content} = req.body;
        const note = await Note.findByIdAndUpdate(req.params.id,{title,content});
        
        if(!note) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message:"Note updated successfully"});
    }
    catch(error){
        console.error("Error occured at updateNote Controller :",error);
        res.status(500).json({message:"Server side error occured!!"});
    }
}

export async function deleteNote (req,res){
    try{
        const note = await Note.findByIdAndDelete(req.params.id);

        if(!note) return res.status(404).json({message:"Note not found"});

        res.status(200).json(note);
    }
    catch(error){
        console.error("Error occured at deleteNote Controller :",error);
        res.status(500).json({message:"Server side error occured!!"});
    }
}