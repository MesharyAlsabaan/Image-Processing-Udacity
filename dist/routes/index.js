"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.send('<h1>Welcome to Images processing project</h1> <h2>To start please add to the url /api/images?filename=udacity&width=23&height=10</h2> <h3>Thanks :)</h3>');
});
router.get('/api/images', function (req, res) {
    (0, middlewares_1.resizeImage)(req, res);
});
exports.default = router;
//# sourceMappingURL=index.js.map