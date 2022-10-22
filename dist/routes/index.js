"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares/middlewares");
const router = (0, express_1.Router)();
router.get("/api/images", function (req, res) {
    (0, middlewares_1.resizeImage)(req, res);
});
exports.default = router;
//# sourceMappingURL=index.js.map