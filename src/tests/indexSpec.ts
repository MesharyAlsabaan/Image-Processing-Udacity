
import supertest from 'supertest';
import app from '../index';
const request = supertest(app);



describe('Test the input all fine', (): void => {
    it('should display 200', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=udacity&width=20&height=10',
      );   
      
      expect(response.status).toBe(200);
    
    });

});
describe('Test the input width if it is in - number', (): void => {
    it('should raise error because of the width', async (): Promise<void> => {

      const response: supertest.Response = await request.get(
        '/api/images?filename=udacity&width=-200&height=100',
      );   
      expect(response.status).toEqual(404);
    });
});

describe('Test the one of the input empty', (): void => {
    it('should raise error because of the width', async (): Promise<void> => {

      const response: supertest.Response = await request.get(
        '/api/images?filename=udacity&width=-200&height=100',
      );   
      expect(response.status).toEqual(404);
    });
});
    