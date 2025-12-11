import app from "./app.js";

// start the server
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Application is running on PORT: ${PORT}`)
})