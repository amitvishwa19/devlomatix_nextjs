'use server'

import mongoose from "mongoose";
import { appConfig } from "./config";



export async function mongoConnect(){
    try {
        //mongoose.connection.close()
        //console.log(mongoose.connection.readyState)
        if(mongoose.connection.readyState !== 1){
            const connected = await mongoose.connect(appConfig.mongoDb.mongoDbUri)
            .then(()=>{
                console.log('MongoDB Connected Succesfully')
            })
        }

    } catch (error) {
        console.log('Error while connecting to MongoDB')
    }
}