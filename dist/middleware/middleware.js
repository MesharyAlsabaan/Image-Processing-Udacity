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
exports.checkImageExist = exports.validation = exports.getImage = void 0;
const path_1 = __importDefault(require("path"));
const imagesFolderPath = path_1.default.resolve('./assets/images');
const fs_1 = require("fs");
const utilities_1 = require("./utilities");
function getImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileName = req.query.filename;
        let width = parseInt(req.query.width);
        let height = parseInt(req.query.height);
        const imagePath = path_1.default.resolve(imagesFolderPath, `${fileName}.png`);
        const destination = `${imagesFolderPath}/thumb/${width}X${height}.png`;
        let resultValidation = yield validation(fileName, width, height, imagePath);
        let isImageExist = yield checkImageExist(destination);
        if (resultValidation) {
            try {
                throw new Error(resultValidation);
            }
            catch (_a) {
                res.send(resultValidation);
            }
        }
        if (isImageExist) {
            res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
            return;
        }
        console.log(isImageExist);
        yield (0, utilities_1.resizeImage)(imagePath, width, height, imagesFolderPath);
        res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
    });
}
exports.getImage = getImage;
function validation(fileName, width, height, imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield fs_1.promises.access(imagePath);
            return '';
        }
        catch (error) {
            return 'The name of the file is not exist';
        }
    });
}
exports.validation = validation;
function checkImageExist(destination) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(destination);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.checkImageExist = checkImageExist;
//# sourceMappingURL=middleware.js.map