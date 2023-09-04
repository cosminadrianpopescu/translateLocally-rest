import bodyParser from "body-parser";
import { Dino } from "dinoloop";
import express from "express";
import { Injector } from "tsdim";
import { TranslatorController } from "./controller";
import { TL_PATH } from "./models";

Injector.provide({provide: TL_PATH, useValue: process.env['TL_PATH']});

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
const dino = new Dino(app, '/api');
dino.useRouter(express.Router);
dino.registerController(TranslatorController);
dino.bind();

app.listen(12345, () => console.log('started on port 12345'));
