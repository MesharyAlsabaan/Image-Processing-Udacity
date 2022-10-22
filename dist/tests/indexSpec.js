"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
const middlewares_1 = require("../middlewares/middlewares");
const path_1 = __importDefault(require("path"));
const imagesFolderPath = path_1.default.resolve('./assets/images');
// Test the End points
describe('Test the main page', () => {
    it('should display instruction for the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
});
describe('Test the input all fine', () => {
    it('should display 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=20&height=10');
        expect(response.status).toBe(200);
    }));
});
describe('Test the input width if it is < 1', () => {
    it('should display message to the user that width or height is < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=-200&height=100');
        expect(response.status).toEqual(200);
    }));
});
describe('Test the one of the input empty', () => {
    it('should raise error because of the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=-200&height=100');
        expect(response.status).toEqual(200);
    }));
});
//Test the function 
describe('Test the input width if it is < 1', () => {
    it('should display message to the user that width or height is < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        let fileName = 'udacity';
        const imagePath = path_1.default.resolve(imagesFolderPath, `${fileName}.png`);
        let val = yield (0, middlewares_1.validation)('udacity', -20, 10, imagePath);
        expect(val).toEqual('Please make sure width and height are positive number');
    }));
});
describe('Test the input file name not exist', () => {
    it('should display message to the user that there is no file on this name', () => __awaiter(void 0, void 0, void 0, function* () {
        let fileName = 'udacity2';
        const imagePath = path_1.default.resolve(imagesFolderPath, `${fileName}.png`);
        let val = yield (0, middlewares_1.validation)('udacity', 20, 10, imagePath);
        expect(val).toEqual('The name of the file is not exist');
    }));
});
describe('Test the input is empty', () => {
    it('should display message to the user that one if the query is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        let fileName = '';
        const imagePath = path_1.default.resolve(imagesFolderPath, `${fileName}.png`);
        let val = yield (0, middlewares_1.validation)('udacity', 20, 10, imagePath);
        expect(val).toEqual('Please make sure that you fill all the queries');
    }));
});
//# sourceMappingURL=indexSpec.js.map