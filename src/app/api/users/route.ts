import { UserController } from "@/controllers/usercontroller";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    try {
        await connectDB()
        const users = await UserController.getAllUsers(request)
        return NextResponse.json(users, {
            status: users.success ? 200 :400
        })
        
    } catch (error) {
        return NextResponse.json({success:false,error: error},{status:500})
    }
}

export async function POST(request:Request) {
    try {
        await connectDB()
        const user = await UserController.createUser(request)
        return NextResponse.json(user,{
            status: user.success ? 201 : 400
        })
    } catch (error) {
        return NextResponse.json({success:false,error: error},{status:500})
    }   
}