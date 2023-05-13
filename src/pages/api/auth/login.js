import { User } from "@/models/user";
import { ConnectDB, cookieSetter, generateToken } from "@/utils/features";

const { asyncError, errorHandler } = require("@/middlewares/error");

import bcrypt from "bcrypt"

const handler = asyncError(async(req,res) => {

    if(req.method !== "POST") 

    return errorHandler(res, 400, "Only POST method allow")

    const {email, password} = req.body;

    if ( !email || !password) return errorHandler(res, 400, "please enter all fileds");

    await ConnectDB();

    const user = await  User.findOne({email}).select("+password")

    if(!user) return errorHandler(res, 400, "Invalid Details")

    const isMatched = await bcrypt.compare(password,user.password)

    if(!isMatched) return errorHandler(res, 400, "Invalid Details")


    const token = generateToken(user._id);

    cookieSetter(res,token,true);


    res.status(200).json({
        success: true,
        message: `wecome back , ${user.name}`,
        user
    })
})

export default handler;