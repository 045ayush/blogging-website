import { SignInInput, SignUpInput } from "@045ayush/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../consfig"
type variableType = SignUpInput | SignInInput

export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate()
    

const [postInputs, setPostInputs] = useState<variableType>(type === "signup" ? {
name : "",
username : "",
password : "",
} : {
username : "",
password : ""
})

    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs)
        const jwt=response.data
        localStorage.setItem("token",jwt)
        const res=await axios.get(`${BACKEND_URL}/api/v1/blog/name`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        localStorage.setItem("name",res.data.name)

        navigate("/blogs")
        }catch(e){
            alert("couldn't sign up")
            console.log(e);
        }

    }
    return <div className="h-screen	flex-col justify-center grid content-center">
        <div className="px-10">
            <div className="text-3xl font-bold text-center">
                {type=="signup"?"Create an account":"Welcome"}
            </div>
            <div className="text-slate-500 p-2 px-3">
            {type=="signup"?"Already have an account?":"Didn't have an account"}
                <Link className="pl-2 underline" to={type=="signup"?"/signin":"/signup"}>{type=="signin"?"SignUp":"Login"}</Link>
            </div>
        </div>
        <div className="pt-4 flex flex-col justify-evenly space-y-4">
        {type=="signup"?<LabelledInput label="Name" placeholder="Ayush.." onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                name:e.target.value
            }))
        }}></LabelledInput>:<></>}
        <LabelledInput label="Username" placeholder="ayush@gmail.com" onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                username:e.target.value
            }))
        }}></LabelledInput>
        <LabelledInput label="Password" type="password" placeholder="123456" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password:e.target.value
            })
        }}></LabelledInput>
        </div>
        <div className="mt-4 mx-1">
        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2">{type=="signin"?"Login":"SignUp"}</button>
        </div>
    </div>
}

interface LabelledInputType{
    label:string
    placeholder:string
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
    type?:string
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return <div>
            <label  className="block mb-2 text-sm font-bold text-black ">{label}</label>
            <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
}