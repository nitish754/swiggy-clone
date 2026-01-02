import 'module-alias/register';
import app from './app';

// start the server
const PORT = process.env.APP_ENV === 'dev' ? process.env.PORT : 4000;

app.listen(PORT, () => {
  console.log(`Application is running on PORT: ${PORT}`);
});
