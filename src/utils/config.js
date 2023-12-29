export const  appConfig = {
    app:{
        appName : String(process.env.NEXT_PUBLIC_APP_NAME),
        appUri: String(process.env.NEXT_PUBLIC_APP_URI),
        appInfo : String(process.env.NEXT_PUBLIC_APP_INFO),
        appVersion : String(process.env.NEXT_PUBLIC_APP_VERSION),
        appSecret : String(process.env.NEXT_PUBLIC_SECRET_TOKEN)
    },
    mongoDb:{
        mongoDbUri : String(process.env.NEXT_PUBLIC_MONGODB_URI)
    },
    appwrite:{
        url: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
        collectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
        bucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    },
    firebaseConfig :{
        apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
        authDomain: String(process.env.NEXT_PUBLIC_AUTH_DOMAIN),
        databaseURL: String(process.env.NEXT_PUBLIC_DATABASEURL),
        projectId: String(process.env.NEXT_PUBLIC_PROJECTID),
        storageBucket: String(process.env.NEXT_PUBLIC_STORAGEBUCKET),
        messagingSenderId: String(process.env.NEXT_PUBLIC_MESSAGINSENDERID),
        appId: String(process.env.NEXT_PUBLIC_APPID),
        measurementId: String(process.env.NEXT_PUBLIC_MESUREMENTID),
    },
    firebaseVapidKey:String(process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY),
    mailtrap:{
        host:String(process.env.NEXT_PUBLIC_MAILTRAP_HOST),
        port:String(process.env.NEXT_PUBLIC_MAILTRAP_PORT),
        username:String(process.env.NEXT_PUBLIC_MAILTRAP_USERNAME),
        password:String(process.env.NEXT_PUBLIC_MAILTRAP_PASSWORD),
    }
    
}