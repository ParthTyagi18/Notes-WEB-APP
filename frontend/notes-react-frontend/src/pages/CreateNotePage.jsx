import {ArrowLeftIcon} from "lucide-react"
import{useState} from "react"
import {Link, useNavigate} from "react-router"
import {toast} from "react-hot-toast"

import axiosApi from "../lib/axios"

const CreateNotePage = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            toast.error("Please enter in the given fields before submitting")
            return
        }
        setIsLoading(true)
        try{
            await axiosApi.post("/notes", {
                title,
                content
            })
            toast.success("Note created successfully!!")
            navigate("/")
        }
        catch (error){
            if(error.response.status === 429){
                console.log("Rate Limited error", error)
                toast.error("Slow down!! Dont create your notes too fast.")
            }
            else{
                console.log("Some error occurred", error)
                toast.error("Error in creating note")
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="min-h-screen p-2">
            <div className="mx-auto max-w-4xl p-4 mt-6">
                <Link to="/" className="btn btn-ghost w-[25%] flex gap-2 items-center justify-start">
                    <ArrowLeftIcon className="size-7" />
                    <span className="text-lg">Go back to Home</span>
                </Link>
                <div className="card mx-[10%] my-[5%] border-2 border-green-500 rounded-xl">
                    <div className="card-body">
                        <h1 className="card-title text-4xl">Create new note</h1>
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="form-control mb-6">
                                <label className="label"><span className="label-text">Title:</span></label>
                                <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Enter title" className="input input-bordered focus:border-green-500 border-2 focus:outline-none" />
                            </div>
                            <div className="form-control mb-6">
                                <label className="label"><span className="label-text">Content:</span></label>
                                <textarea value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Enter content here" className="textarea textarea-bordered h-32 focus:border-green-500 border-2 focus:outline-none" />
                            </div>
                            <div className="form-control mb-6">
                                <button type="submit" disabled={isLoading} className="btn bg-green-800 hover:bg-green-500 focus:outline-none transition-colors duration-100">{isLoading ? 'Creating...' : 'Create Note'}</button>
                            </div>
                        </form>
                    </ div>
                </div>
            </div>
        </div>
    )
}

export default CreateNotePage