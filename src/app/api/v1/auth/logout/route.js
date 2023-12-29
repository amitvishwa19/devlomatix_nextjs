import { mongoConnect } from "@/utils/db";
import { logout } from "@/controllers/user.controller";
mongoConnect()


export async function GET(request, response) {
    return logout(request, response)
}