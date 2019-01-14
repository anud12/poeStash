import {NextFunction, Request, Response} from "express";
import app from "../app";
import {uriFromRoot} from "../uriFromRoot.function";

app.route([
    uriFromRoot('/')
])
    .get(async (req: Request, res: Response, next: NextFunction) => {
        res.render(__filename.replace(".js", ".ejs"));
    })

    .post(async (req: Request, res: Response, next: NextFunction) => {
        res.cookie("__cfduid", req.body["__cfduid"]);
        res.cookie("POESESSID", req.body["POESESSID"]);
        res.redirect(`/stash?__cfduid=${req.body["__cfduid"]}&POESESSID=${req.body["POESESSID"]}`);
    });
