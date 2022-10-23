import express from 'express';
import path from 'path';
const sharp = require('sharp');
const imagesFolderPath = path.resolve('./assets/images');
import { promises as fs } from 'fs';


export async function resizeImage(req: express.Request, res: express.Response):Promise<boolean>  {
  let fileName = req.query.filename as string;
  let width = parseInt(req.query.width as string);
  let height = parseInt(req.query.height as string);
  const imagePath = path.resolve(imagesFolderPath, `${fileName}.png`);
  const destination = `${imagesFolderPath}/thumb/${width}X${height}.png`;


let resultValidation = await validation(fileName,width,height,imagePath); 
let isImageExist = await checkImageExist(destination);

if(isImageExist){
  res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
  return;
}

if(resultValidation){
    res.send(resultValidation);
    return false
}

  try {
    await sharp(imagePath)
      .resize(width, height)
      .toFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
  } catch (e) {
    res.send(e);
  }

  res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
}



export async function validation(fileName?:string,width?:number,height?:number,imagePath?:string):Promise<string>{
  
    if (!fileName || (!width && height)) {
      // throw new Error('Please make sure that you fill all the queries');
      return 'Please make sure that you fill all the queries'
    }
    if (width <= 0 || height <= 0) {
      // throw new Error('Please make sure width and height are positive number');
      return 'Please make sure width and height are positive number';
    }
  
   
    try {
      await fs.access(imagePath);
  } catch (error) {
      return 'The name of the file is not exist'
  
  }
}


export async function checkImageExist(destination:string){
  try {
    await fs.access(destination);
    return true
} catch (error) {
  
    return false

}

}