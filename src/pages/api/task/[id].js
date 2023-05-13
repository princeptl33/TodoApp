// import Todo from "@/models/practice";
import { asyncError, errorHandler } from "@/middlewares/error";
import Task from "@/models/task";
import { ConnectDB, checkAuth } from "@/utils/features"


const handler = asyncError(async(req,res) => {


    await  ConnectDB();
    const user = await checkAuth(req);
 
    if(!user) return errorHandler(res, 401, "Login First")

    // console.log(req.query)

    const taskId = req.query.id;

    const task =  await Task.findById(taskId)

    if(!task) return  errorHandler(res, 404, "task not found")
    if(req.method === "PUT") {

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "task updated successfully"
        })

    }
    else if (req.method === "DELETE"){
        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "task deleted successfully"
        })
    }
    else{
        errorHandler(res, 400, "Only PUT & DELETE method allow")
    }
    
    
})

export default handler 