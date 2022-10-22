import express from 'express';
const app = express();
const port = 8080;
import router from './routes';

// define a route handler for the default home page
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
