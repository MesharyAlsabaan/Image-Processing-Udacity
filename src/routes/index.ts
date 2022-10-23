import { Router } from 'express';
import { resizeImage } from '../utilities/utilities';
import express from 'express';

const router = Router();



router.get('/', function (req:express.Request, res:express.Response) {
 res.send('<h1>Welcome to Images processing project</h1> <h2>To start please add to the url /api/images?filename=udacity&width=23&height=10</h2> <h3>Thanks :)</h3>')
});


router.get('/api/images', function (req:express.Request, res:express.Response) {
  resizeImage(req, res);
});

export default router;
