import { Link } from "react-router-dom"

interface BlogCardProps{
    id:number
    authorname:string
    title:string 
    content:string 
    publishdate:string 
}

export const Blogscard=({
    id,
    authorname,
    title,
    content,
    publishdate
}:BlogCardProps)=>{
    return<Link to={`/blog/${id}`}>
     <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-3xl cursor-pointer">
        <div className="flex ">
            <div className="flex justify-center flex-col">
            <Avatar Aname={authorname}></Avatar>
            </div>
            {/* add ceter align dot */}
            <div className="font-normal pl-3 px-2 text-slate-800">
            {authorname}
            </div>
            <div className="text-slate-500">&#x2022;</div>
            <div className="font-light px-2 text-slate-500">
                {publishdate}
            </div> 
            
        </div>
        <div className="text-xl font-bold pt-3 pb-1">
            {title}
        </div>
        <div className="font-normal text-slate-800">
            {/* check if content > 100 */}
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-500 font-light text-xs pt-6">
            {`${Math.ceil(content.length/100 )} mintue(s) read`}
        </div>
    </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({Aname,size="small"}:{Aname:string, size?:"small"|"big"}){
    return<div className={`relative inline-flex items-center justify-center ${size=="big"?"w-10 h-10":"w-6 h-6"} overflow-hidden rounded-full bg-gray-600`}>
    <span className={`${size=="big"?"font-semibold":"font-medium"}font-semibold text-gray-300`}>{Aname[0]}</span>
</div>
}