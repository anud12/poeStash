import {NextFunction, Request, Response} from "express";
import app from "../app";
import {uriFromRoot} from "../uriFromRoot.function";
import * as fs from "fs";
import * as Handlebars from "handlebars"

app.route([
    uriFromRoot('/')
]).get(async (req: Request, res: Response, next: NextFunction) => {
    const template = Handlebars.compile(fs.readFileSync(__dirname + "/root.hbs").toString());
    res.status(200)
        .send(template({}))
}).post(async (req: Request, res: Response, next: NextFunction) => {
    res.redirect(`/stash?__cfduid=${req.body["__cfduid"]}&POESESSID=${req.body["POESESSID"]}`);
});
