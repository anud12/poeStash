import app from "../../app";
import {uriFromRoot} from "../../uriFromRoot.function";
import {NextFunction, Request, Response} from "express";
import PathOfExileService from "../../service/PathOfExileService";


// __cfduid:"df0d5c5d40be69f64244bffc169cca4411543539367"
// POESESSID:"a615e6a6ed31ff689700c579bcb6957e"
app.route([
    uriFromRoot('/'),
    uriFromRoot('/:stashNumber')
])
    .get(async (req: Request, res: Response, next: NextFunction) => {
        if (req.cookies["__cfduid"] === undefined
            || req.cookies["POESESSID"] === undefined) {
            res.redirect("/")
        }
        res.render(__filename.replace(".js", ".ejs"), {
            tab: await PathOfExileService
                .getStashWithCookie(req.cookies)
                .tabIndex(req.params["stashNumber"] | 0)
        })
    });