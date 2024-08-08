import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogscard"

export const Singleblog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center mx-10 ">
                <div className="grid grid-cols-12 w-full px-10 pt-10  max-w-screen-2xl">
                <div className="col-span-8 mr-6">
                    <div className="text-4xl font-extrabold ">
                    {blog.title}
                    </div>
                    <div className="text-slate-500 pt-3 font-normal ">
                    Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                    {blog.content}
                    </div>
                </div>
                <div className="col-span-4 flex flex-col ml-6">
                    <div className="font-semibold pb-4">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex flex-col justify-center">
                            <Avatar Aname={blog.author.name}></Avatar>
                        </div>
                        <div className="pl-4">
                            <div className="font-bold text-xl">
                            {blog.author.name}
                            </div>
                            <div className="pt-2 text-slate-600 font-medium">
                            “Diving Deep into the Digital Realm: Exploring Innovations, Insights, and Trends That Shape Tomorrow”
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}