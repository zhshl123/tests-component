"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actors = void 0;
const playwright_1 = require("@serenity-js/playwright");
const rest_1 = require("@serenity-js/rest");
const tiny_types_1 = require("tiny-types");
class Actors {
    constructor(browser, options, baseApiUrl) {
        this.browser = browser;
        this.options = options;
        this.baseApiUrl = baseApiUrl;
        (0, tiny_types_1.ensure)('apiUrl', baseApiUrl, (0, tiny_types_1.isNotBlank)());
    }
    prepare(actor) {
        return actor.whoCan(playwright_1.BrowseTheWebWithPlaywright.using(this.browser, this.options)).whoCan(rest_1.CallAnApi.at(this.baseApiUrl));
    }
}
exports.Actors = Actors;
//# sourceMappingURL=Actors.js.map