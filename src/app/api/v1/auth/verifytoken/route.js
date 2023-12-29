import { mongoConnect } from "@/utils/db";
import { verifyToken } from "@/controllers/user.controller";
mongoConnect()


export async function POST(request, response) {
    return verifyToken(request, response)
}