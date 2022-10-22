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
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares/middlewares");
describe('Test the input width if it is in - number', () => {
    it('should raise error because of the width', () => __awaiter(void 0, void 0, void 0, function* () {
        const param = {
            filename: 'encenadaport',
            width: -100,
            height: 500,
        };
        const error = yield (0, middlewares_1.validation)(param.filename, param.width, param.height);
        console.log('everything is a,amsms');
        expect(error).not.toBeNull();
    }));
});
//# sourceMappingURL=indexSpec.js.map