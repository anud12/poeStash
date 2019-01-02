let path = require("path");
let callsite = require('callsite');

class PathOptions {
    root: string
}

let pathOptions = new PathOptions();
pathOptions.root = __dirname + "\\www";
export default pathOptions;

export function uriFromRoot(route: string) {
    var stack = callsite(),
        requester = stack[1].getFileName();
    const fileLocation = path.dirname(requester);
    const trunace = fileLocation.split(pathOptions.root)[1] + route;
    const unixTruncate = trunace.split("\\").join("/");
    console.log(unixTruncate);
    return unixTruncate;
}