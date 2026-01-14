import {useState, useEffect} from "react"
import {toast} from "react-hot-toast"
import {LucideLoader2} from "lucide-react"

import NavBar from "../components/NavBar"
import RateLimitedUI from "../components/RateLimitedUI"
import Notes from "../components/Notes"
import axiosApi from "../lib/axios"
import EmptyState from "../components/EmptyState"

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getNotes = async () => {
            try{
                const res = await axiosApi.get('/notes')
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            }
            catch(error){
                console.error("Some error occured!!")
                if(error.response.status===429){
                    setIsRateLimited(true)
                    toast.error("Too many requests. Slow down !!")
                }
                else{
                    toast.error("Failed to load notes")
                }
            }
            finally{
                setIsLoading(false)
            }
        }
        getNotes()
    }, [])

    return (
        <div className="min-h-screen">
       <NavBar />
       {isRateLimited && <RateLimitedUI />}
       <div className="mx-auto max-w-7xl p-4 mt-6">
         {isLoading && <div className="flex justify-center items-center pb-[25%] gap-4 min-h-screen text-primary"><LucideLoader2 className="animate-spin" />Loading....</div>}
         {notes.length === 0 && !isLoading && !isRateLimited && <EmptyState />}
         {(notes.length > 0) && !isRateLimited && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {notes.map((note) => {return (
                  <Notes key={note._id} note={note} setNotes={setNotes} />
              )})
              }

          </div>)}
        </div>     
       </div>
    )
}

export default HomePage