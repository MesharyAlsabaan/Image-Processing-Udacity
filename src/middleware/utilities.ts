const sharp = require('sharp');




export async function resizeImage(imagePath:string,width:number,height:number,imagesFolderPath:string){
    try {
        await sharp(imagePath)
          .resize(width, height)
          .toFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
      } catch (e) {
        return e
      }
      return true
    
    
}