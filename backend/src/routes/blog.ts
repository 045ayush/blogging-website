import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from 'hono/jwt'
import { createBlogInput ,updateBlogInput} from '@045ayush/medium-common'


export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    }
    Variables:{
        userId:any
        name:any
    }
  }>()

blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("Authorization") || ""
    try{
        const user=await verify(authHeader,c.env.JWT_SECRET)
        
        if(user){
            c.set("userId",user.id)
            await next()
        }
    }catch(e){
        console.log();
        c.status(403)
        return c.text("authorization error")
    }
})

blogRouter.get('/name', async(c) => {
  const authorid=c.get("userId")
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try{
    const name=await prisma.user.findFirst({
      where:{
        id: authorid,
      },
      select:{
        name:true
      }
    })
    c.status(200)
    return c.text(`${JSON.stringify(name)}`)
  }
  catch(e){
      console.log(e);
      
    c.status(411)
    return c.text("couldnt post")
  }
})

blogRouter.post('/', async(c) => {
    const body=await c.req.json()
    const { success }= createBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("wrong inputs")
  }
    const authorId=c.get("userId")
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
      const blog=await prisma.blog.create({
        data:{
          title: body.title,
          content: body.content,
          authorId: Number(authorId)
        }
      })
      c.status(200)
      return c.text(`${blog.id}`)
    }
    catch(e){
        console.log(e);
        
      c.status(411)
      return c.text("couldnt post")
    }
  })
  
  blogRouter.put('/', async(c) => {
    const body=await c.req.json()
    const { success }= updateBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.text("wrong inputs")
  }
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
      const blog=await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
          title: body.title,
          content: body.content,
        }
      })
      c.status(200)
      return c.text(`blod with id: ${blog.id} is updated`)
    }
    catch(e){
      c.status(411)
      return c.text("couldnt update")
    }
  })
    
  //Todo : add pagination
  blogRouter.get('/bulk', async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
    try{
        const blogs=await prisma.blog.findMany(
          {
            select:{
              content:true,
              title:true,
              id:true,
              author:{
                select:{
                  name:true
                }
              }
            }
          }
        )
    return c.json({blogs})
    }
    catch(e){
        c.status(411)
      return c.text("error while fetching")
    }
  })

  blogRouter.get('/:id', async(c) => {
    const id=await c.req.param("id")
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
      const blog=await prisma.blog.findFirst({
        where:{
            id:Number(id)
        },select:{
          title:true,
          content:true,
          id:true,
          author:{
             select:{
              name:true
             }
          }
        }
      })
      if(!blog){
        c.status(411)
        return c.text(`couldnt get any blog with id: ${id}`)
      }
      c.status(200)
      return c.json({blog})
    }
    catch(e){
      c.status(411)
      return c.text("error while fetching")
    }
  })