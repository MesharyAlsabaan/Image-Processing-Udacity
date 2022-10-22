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
describe('Test the input all fine', () => {
    it('should display 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=20&height=10');
        expect(response.status).toBe(200);
    }));
});
describe('Test the input width if it is in - number', () => {
    it('should raise error because of the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=-200&height=100');
        expect(response.status).toEqual(404);
    }));
});
describe('Test the one of the input empty', () => {
    it('should raise error because of the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=udacity&width=-200&height=100');
        expect(response.status).toEqual(404);
    }));
});
//# sourceMappingURL=indexSpec.js.map