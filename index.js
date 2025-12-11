const express = require('express')

const app = express();

const PORT = 3000;

app.use((req,res)=>{
   res.status(200).json({
     message : "application is running OK!"
   });
})

app.listen(PORT, ()=>{
    console.log(`Application is running on PORT ${PORT}`)
})