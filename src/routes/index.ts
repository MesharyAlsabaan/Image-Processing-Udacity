import { Router } from "express";
import {resizeImage} from "../middlewares/middlewares"
const router = Router();


router.get("/api/images", function (req, res) {
    resizeImage(req, res)

  });



  export default router;
