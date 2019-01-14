import {HttpClient} from "typed-rest-client/HttpClient";
import responsePoeModelMapper from "../mapper/responsePoeModelMapper";

interface PathOfExileCookies {
    __cfduid: string,
    POESESSID: string
}

class PathOfExileService {
    private httpClient: HttpClient = new HttpClient("");

    getStashWithCookie(cookies: PathOfExileCookies) {
        return {
            tabIndex: async (tabIndex) => {
                return await this.httpClient.get(this.buildUrl(tabIndex), this.buildCookies(cookies))
                    .then(value => value.readBody())
                    .then(value => JSON.parse(value) as ResponsePoeModel)
                    .then(value => responsePoeModelMapper(value))
            }
        }
    }

    private buildCookies(cookies: PathOfExileCookies) {
        return {
            Cookie: `__cfduid=${cookies.__cfduid}; POESESSID=${cookies.POESESSID}`
        };
    }

    private buildUrl(tabIndex) {
        return `https://www.pathofexile.com/character-window/get-stash-items?accountName=anud&tabIndex=${tabIndex}"&league=Betrayal&tabs=1`;
    }
}

export default new PathOfExileService();