import { Link } from "react-router-dom"
import { Avatar } from "./Blogscard"

export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <div>
        <Link to={"/blogs"} className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 9 4 C 6.239 4 4 6.239 4 9 L 4 41 C 4 43.761 6.239 46 9 46 L 41 46 C 43.761 46 46 43.761 46 41 L 46 9 C 46 6.239 43.761 4 41 4 L 9 4 z M 20 12 L 25 12 C 29.42 12 33.033 15.632547 33 20.060547 C 32.991 21.141547 33.919 22 35 22 L 36 22 C 37.105 22 38 22.895 38 24 L 38 30 C 38 34.4 34.4 38 30 38 L 20 38 C 15.6 38 12 34.4 12 30 L 12 25 L 12 20 C 12 15.6 15.6 12 20 12 z M 20 18 C 18.9 18 18 18.9 18 20 C 18 21.1 18.9 22 20 22 L 25 22 C 26.1 22 27 21.1 27 20 C 27 18.9 26.1 18 25 18 L 20 18 z M 20 28 C 18.9 28 18 28.9 18 30 C 18 31.1 18.9 32 20 32 L 30 32 C 31.1 32 32 31.1 32 30 C 32 28.9 31.1 28 30 28 L 20 28 z"/></svg>
        <div className="flex justify-center items-center text-4xl font-bold">
            logs
        </div>
        </Link>
        </div>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} Aname={localStorage.getItem("name")||"User"} />
        </div>
    </div>
}
