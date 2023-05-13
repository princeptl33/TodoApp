// import Todo from "@/models/practice";
import { asyncError, errorHandler } from "@/middlewares/error";
import Task from "@/models/task";
import { ConnectDB, checkAuth } from "@/utils/features"


const handler = asyncError(async(req,res) => {

    if(req.method !== "POST") 

    return errorHandler(res, 400, "Only POST method allow")
    
   await  ConnectDB();

   const {title, description} = req.body;

   if(!title || !description ) return errorHandler(res, 400, "Please enter all fields")

   const user = await checkAuth(req);

   if(!user) return errorHandler(res, 401, "Login First")

   await Task.create({
    title,
    description,
    user: user._id,
   })
    
    res.json({
        success: true,
        message: "task created successfully"
    })
})

export default handler 