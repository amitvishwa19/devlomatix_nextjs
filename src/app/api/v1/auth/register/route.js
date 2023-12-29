import { mongoConnect } from "@/utils/db";
import { registerUser } from "@/controllers/user.controller";

mongoConnect()

export async function POST(request,response) {
    return registerUser(request,response)
}