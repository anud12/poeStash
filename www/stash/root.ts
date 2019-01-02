import app from "../../app";
import {uriFromRoot} from "../../uriFromRoot.function";
import {NextFunction, Request, Response} from "express";
import * as Handlebars from "handlebars";
import * as fs from "fs";
import {RestRequest} from "../../RestRequest.class";

app.route([
    uriFromRoot('/'),
    uriFromRoot('/:stashNumber')
]).get(async (req: Request, res: Response, next: NextFunction) => {
    if (req.query["__cfduid"] === undefined
        || req.query["POESESSID"] === undefined) {
        res.redirect("/")
    }
    const template = Handlebars.compile(fs.readFileSync(__dirname + "/root.hbs").toString());
    const page = req.params["stashNumber"] | 0;
    const headers = {
        Cookie: `__cfduid=${req.query["__cfduid"]}; POESESSID=${req.query["POESESSID"]}`
    };
    const tab = await RestRequest.build("https://www.pathofexile.com")
        .get<ResponsePoeModel>("/character-window/get-stash-items?accountName=anud&tabIndex=" + page + "&league=Betrayal&tabs=1", headers)
        .then((value) => value.body);
    res.status(200)
        .send(template({
                tab,
                parameter: `__cfduid=${req.query["__cfduid"]}&POESESSID=${req.query["POESESSID"]}`
            })
        )
});