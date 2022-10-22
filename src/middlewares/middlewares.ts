import express from "express";
import path from "path";
const sharp = require("sharp");
const imagesFolderPath = path.resolve("./assets/images");

export async function resizeImage(req: express.Request, res: express.Response) {
    let fileName = req.query.filename as string;
     let width = parseInt(req.query.width as string);
     let height = parseInt(req.query.height as string);
     
     if(!fileName || !width && height){
       
        throw new Error("Please make sure that you fill all the queries");
    }
    if(width <=0 || height <= 0){
        res.status(404)
        throw new Error("Please make sure width and height are positive number");
    }
     
     

  const imagePath = path.resolve(imagesFolderPath,`${fileName}.png`);
  console.log("imagesFolderPath", imagesFolderPath);

  try {
    await sharp(imagePath)
      .resize(width,height)
      .toFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
  } catch (e){
    res.send(e)
  }
console.log(`${imagesFolderPath}/thumb/${width}X${height}.png`);

  res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
}

