import express from 'express';
import path from 'path';
const imagesFolderPath = path.resolve('./assets/images');
import { promises as fs } from 'fs';
import { resizeImage } from './utilities';

export async function getImage(
  req: express.Request,
  res: express.Response,
): Promise<boolean> {
  let fileName = req.query.filename as string;
  let width = parseInt(req.query.width as string);
  let height = parseInt(req.query.height as string);
  const imagePath = path.resolve(imagesFolderPath, `${fileName}.png`);
  const destination = `${imagesFolderPath}/thumb/${width}X${height}.png`;

  let resultValidation = await validation(fileName, width, height, imagePath);
  let isImageExist = await checkImageExist(destination);

  if (resultValidation) {
    try{
      throw new Error(resultValidation);
    }catch{
      res.send(resultValidation);
    }
  }
  if (isImageExist) {
    res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
    return;
  }

  await resizeImage(imagePath, width, height, imagesFolderPath);

  res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
}

export async function validation(
  fileName?: string,
  width?: number,
  height?: number,
  imagePath?: string,
): Promise<string> {

  if (!height) {
    return 'Please make sure that you fill all the queries';
  }
  if (!fileName || (!width && height)) {
    return 'Please make sure that you fill all the queries';
  }
  if (width <= 0 || height <= 0) {
    return 'Please make sure width and height are positive number';
  }

  try {
    await fs.access(imagePath);
    return '';
  } catch (error) {
    return 'The name of the file is not exist';
  }
}

export async function checkImageExist(destination: string) {
  try {
    await fs.access(destination);
    return true;
  } catch (error) {
    return false;
  }
}
