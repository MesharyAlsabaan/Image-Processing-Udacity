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
exports.resizeImage = void 0;
const path_1 = __importDefault(require("path"));
const sharp = require("sharp");
const imagesFolderPath = path_1.default.resolve("./assets/images");
function resizeImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileName = req.query.filename;
        let width = parseInt(req.query.width);
        let height = parseInt(req.query.height);
        if (!fileName || !width && height) {
            throw new Error("Please make sure that you fill all the queries");
        }
        if (width <= 0 || height <= 0) {
            res.status(404);
            throw new Error("Please make sure width and height are positive number");
        }
        const imagePath = path_1.default.resolve(imagesFolderPath, `${fileName}.png`);
        console.log("imagesFolderPath", imagesFolderPath);
        try {
            yield sharp(imagePath)
                .resize(width, height)
                .toFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
        }
        catch (e) {
            res.send(e);
        }
        console.log(`${imagesFolderPath}/thumb/${width}X${height}.png`);
        res.sendFile(`${imagesFolderPath}/thumb/${width}X${height}.png`);
    });
}
exports.resizeImage = resizeImage;
//# sourceMappingURL=middlewares.js.map