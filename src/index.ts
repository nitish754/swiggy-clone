import "module-alias/register";
import app from "./app";



// start the server
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Application is running on PORT: ${PORT}`)
})