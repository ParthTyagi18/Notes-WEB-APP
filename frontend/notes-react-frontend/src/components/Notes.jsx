import {Link} from "react-router"
import {PenBox, Trash2Icon} from "lucide-react"
import {toast} from "react-hot-toast"

import axiosApi from "../lib/axios"


const Notes = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if(!window.confirm("Are you sure; you want to delete the note ?")) return
        try{
            await axiosApi.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter((n) => n._id !== id))
            toast.success("Note deleted successfully")
        }
        catch (error){
            if(error.response.status === 429){
                toast.error("Too many deletion attempts in a short period. Slow Down !!")
            }
            else{
                console.log("Error in handleDelete", error)
                toast.error("Could not delete the notes")
            }
        }
    }

    return(
        <>
          <Link to={`/note/${note._id}`} key={note._id} data-theme="forest" className="min-h-[90px] group p-1 rounded-md border-2 border-green-500 hover:bg-green-800 active:scale-95 transition-all duration-100">
            <h2 key={`${note._id}1`} className="px-1 font-bold text-1xl text-green-300 border-b-1 border-b-green-500 group-hover:text-green-300 text-wrap break-words line-clamp-2">{note.title}</h2>
            <p key={`${note._id}2`} className="m-1 text-green-400 group-hover:text-green-200 text-wrap break-words line-clamp-5">{note.content}</p>
            <div key={`${note._id}3`} className="p-1 border-t-2 border-t-green-500 md:flex justify-between items-center">
                <div key={`${note._id}3.1`} className="text-sm">
                    <span className="text-green-500">Created:</span> {new Date(note.createdAt).toLocaleDateString(undefined,{
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric'
                    })}
                </div>
                <div key={`${note._id}3.2`} className="text-sm">
                    <span className="text-green-500">Modified:</span> {new Date(note.updatedAt).toLocaleDateString(undefined, {
                        day:'2-digit',
                        month:'2-digit',
                        year:'numeric'
                    })}
                </div>
                <div key={`${note._id}3.3`} className="flex items-center gap-0.5">
                    <PenBox className="size-5"/>
                    <button onClick={(e) => {handleDelete(e,note._id)}} className="btn btn-ghost text-error focus:outline-none">
                        <Trash2Icon className="size-5"/>
                    </button>
                </div>
            </div>
          </Link>
        </>
    )
}

export default Notes