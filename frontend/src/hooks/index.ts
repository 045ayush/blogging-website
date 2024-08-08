import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../consfig"

export interface Blog{
    "content":string
    "title":string
    "id":number
    "author":{
        "name":string
    }
}

export const useBlog=({id}:{id:string})=>{
    const [blog,setBlog]=useState<Blog>({
        content:"",
        title:"",
        id:-1,
        author:{
            name:"",
        }
    })
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(response=>{
            setBlog(response.data.blog)
            setLoading(false)
        })
    },[id])
    return{
        loading,
        blog
    }
}

export const useBlogs=()=>{

    const [blogs,setBlogs]=useState<Blog[]>([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(response=>{
            setBlogs(response.data.blogs)
            setLoading(false)
        })
    })
    return{
        loading,
        blogs
    }
}