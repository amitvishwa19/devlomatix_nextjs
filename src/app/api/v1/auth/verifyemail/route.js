import { mongoConnect } from "@/utils/db";
import { verifyEmail } from "@/controllers/user.controller";
mongoConnect()


export async function POST(request, response) {
    return verifyEmail(request)
}