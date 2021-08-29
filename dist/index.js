"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var mail_1 = __importDefault(require("@sendgrid/mail"));
dotenv_1.config();
mail_1.default.setApiKey(process.env.SENGRID_API);
var email_controller_1 = __importDefault(require("./email/email.controller"));
var PORT = process.env.PORT || 5000;
var server = express_1.default();
server.use(express_1.default.json());
server.get('/', function (req, res) {
    var msg = {
        to: 'hanktheiii1337@gmail.com',
        from: 'josealvarado1337@gmail.com',
        subject: 'test',
        text: 'Hello world',
        html: fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'public', 'index.html'), 'utf-8'),
        dynamicTemplateData: {},
    };
    mail_1.default.send(msg);
    res.json('Message sent');
});
server.use('/email', email_controller_1.default);
server.listen(PORT, function () {
    console.log("Server on http://localhost:" + PORT);
});
