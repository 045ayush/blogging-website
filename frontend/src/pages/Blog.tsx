import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Singleblog } from "../components/Singleblog"
import { Appbar } from "../components/Appbar"
import { Spinner } from "../components/Sppiner";

export const Blog=() =>{
    const {id}=useParams()
    const {loading,blog}=useBlog({id:id||""})
    if (loading || !blog) {
      return <div className="h-screen">
          <Appbar />
      
          <div className="min-h-full pb-20 flex justify-center items-center">
              
                  <Spinner />
          </div>
      </div>
  }
    return (
      <div> 
        <Singleblog blog={blog}></Singleblog>
      </div>
    )
  }