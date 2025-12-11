import express, {} from 'express';
const app = express();
const PORT = 3000;
app.use((res) => {
    res.status(200).json({
        message: "Application is running OK!"
    });
});
export default app;
//# sourceMappingURL=app.js.map