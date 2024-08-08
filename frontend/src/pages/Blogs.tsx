import { Appbar } from "../components/Appbar"
import { Blogscard } from "../components/Blogscard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs=() =>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton></BlogSkeleton>
                <BlogSkeleton></BlogSkeleton>
            </div>
        </div>
    </div>
    }

    return (<div>
        <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="">
            {blogs.map(blog=><Blogscard
            id={blog.id}
            authorname={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishdate="07 August 2024">
            </Blogscard>)}

      </div>
      </div>
      </div>
    )
  }