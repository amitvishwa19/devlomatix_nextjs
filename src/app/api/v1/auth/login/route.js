import { mongoConnect } from "@/utils/db";
import { loginUser } from "@/controllers/user.controller";
mongoConnect()


export async function POST(request, response) {
    return loginUser(request, response)
}