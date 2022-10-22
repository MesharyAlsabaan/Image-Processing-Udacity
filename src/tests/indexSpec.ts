import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
import {validation} from '../middlewares/middlewares'
import path from 'path';
const imagesFolderPath = path.resolve('./assets/images');




// Test the End points
describe('Test the main page', (): void => {
  it('should display instruction for the user', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/',
    );

    expect(response.status).toBe(200);
  });
});

describe('Test the input all fine', (): void => {
  it('should display 200', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=udacity&width=20&height=10',
    );

    expect(response.status).toBe(200);
  });
});
describe('Test the input width if it is < 1', (): void => {
  it('should display message to the user that width or height is < 1', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=udacity&width=-200&height=100',
    );
    expect(response.status).toEqual(200);
  });
});

describe('Test the one of the input empty', (): void => {
  it('should raise error because of the width', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=udacity&width=-200&height=100',
    );
    expect(response.status).toEqual(200);
  });
});




//Test the function 
describe('Test the input width if it is < 1', (): void => {
  it('should display message to the user that width or height is < 1', async (): Promise<void> => {
    let fileName = 'udacity'
    const imagePath = path.resolve(imagesFolderPath, `${fileName}.png`);
   let val = await validation('udacity',-20,10,imagePath)
    expect(val).toEqual('Please make sure width and height are positive number');
  });
});

describe('Test the input file name not exist', (): void => {
  it('should display message to the user that there is no file on this name', async (): Promise<void> => {
    let fileName = 'udacity2'
    const imagePath = path.resolve(imagesFolderPath, `${fileName}.png`);
   let val = await validation('udacity',20,10,imagePath)
    expect(val).toEqual('The name of the file is not exist');
  });
});
