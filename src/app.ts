import express, { type Application, type Request, type Response } from 'express'

const app:Application = express();

const PORT= 3000;

app.use((res:Response)=>{
    res.status(200).json({
        message : "Application is running OK!"
    })
})

export default app;