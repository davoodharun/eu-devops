"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const express_validator_1 = __importDefault(require("express-validator"));
const MongoStore = connect_mongo_1.default(express_session_1.default);
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config({ path: ".env.example" });
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_validator_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist"), { maxAge: 31557600000 }));
app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});
exports.default = app;
//# sourceMappingURL=app.js.map