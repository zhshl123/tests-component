"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_REMOVE = exports.API_SAVE = exports.API_RETRIEVE_ALL = exports.API_GETVIEW_RESULT = exports.API_LOGIN = void 0;
const WebsitePageMap_1 = require("../outofbox/WebsitePageMap");
exports.API_LOGIN = WebsitePageMap_1.PROJECT_URL + '/api/Authentication/Login';
exports.API_GETVIEW_RESULT = WebsitePageMap_1.PROJECT_URL + '/api/DynamicPage/GetViewResult';
exports.API_RETRIEVE_ALL = WebsitePageMap_1.PROJECT_URL + '/api/Organization/RetrieveAll';
exports.API_SAVE = WebsitePageMap_1.PROJECT_URL + '/api/Organization/Save';
exports.API_REMOVE = WebsitePageMap_1.PROJECT_URL + '/api/Organization/Remove';
//# sourceMappingURL=WebsiteApiUrl.js.map