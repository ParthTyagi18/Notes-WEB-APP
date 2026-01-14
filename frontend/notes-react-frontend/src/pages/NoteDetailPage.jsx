import {ArrowLeftIcon, LucideLoader2, Trash, Trash2Icon} from "lucide-react"
import {Link, useParams, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import {toast} from "react-hot-toast"


import axiosApi from "../lib/axios"

const NoteDetailPage = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [save, setSave] = useState(false)

    useEffect(() => {
        const getNote = async () => {
            try{
                const res = await axiosApi.get(`/notes/${id}`)
                setNote(res.data)
            }
            catch (error){
                if(error.response.status === 429){
                    toast.error("Too many requests. Slow Down !!")
                }
                else{
                    console.log("Error in NoteDetailPage useEffect", error)
                    toast.error("Could not fetch note")
                }
            }
            finally{
                setIsLoading(false)
            }
        }
        getNote()
    }, [id])

    const handleSave = async (e) => {
        e.preventDefault()
        setSave(true)
        try{
            await axiosApi.put(`/notes/${id}`, note)
            toast.success("Note updated successfully")
            navigate("/")
        }
        catch (error){
            if(error.response.status === 429){
                toast.error("Too many requests. Slow Down !!")
            }
            else{
                console.log("Error in NoteDetailPage handleSave", error)
                toast.error("Could not update the note")
            }
        }
        finally{
            setSave(false)
        }
    }

    const handleDeletion = async () => {
        try{
            await axiosApi.delete(`/notes/${id}`)
            toast.success("Note deleted successfully")
            navigate("/")
        }
        catch (error){
            if(error.response.status === 429){
                toast.error("Too many deletion requests. Slow Down !!")
            }
            else{
                console.log("Error in NoteDetailPage handleDeletion", error)
                toast.error("Could not delete the note")
            }
        }
    }

    if (isLoading){
        return (
            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="animate-spin"><LucideLoader2 /></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-4 m-6">
            <div className="max-w-4xl mx-auto my-5">
                <Link to="/" className="btn btn-ghost">
                    <ArrowLeftIcon className="size-7" />
                    <span className="text-lg">Go to Home</span>                
                </Link>
                <div className="card max-w-2xl mx-auto my-8 p-2 border-2 border-green-500">
                    <div className="card-body">
                        <div className="mb-6 flex justify-between items-center">
                            <h1 className="card-title text-4xl">Edit Card</h1>
                            <button onClick={handleDeletion} className="btn btn-outline text-error"><Trash2Icon className="size-5" />Delete Note</button>
                        </div>
                        <form>
                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text">Title:</span></label>
                                <input type="text" value={note.title} onChange={(e) => setNote({...note, title : e.target.value})} placeholder="Title" className="input input-bordered border-2 focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text">Content:</span></label>
                                <textarea value={note.content} onChange={(e) => setNote({...note, content : e.target.value})} placeholder="Content" className="textarea textarea-bordered border-2 h-40 focus:outline-none focus:border-green-500" />
                            </div>
                            <div className="mt-2 card-actions justify-end items-center">
                                <button type="submit" disabled={save} onClick={(e) => {handleSave(e)}} className="btn bg-green-800 hover:bg-green-500 focus:outline-none transition-colors duration-100">
                                    <span>{save ? `Saving Note...` : `Save Note`}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default NoteDetailPage