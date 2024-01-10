"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulletin = exports.EditBulletin = void 0;
const abstract_1 = require("../common/abstract");
const BulletinAttributes_1 = require("./BulletinAttributes");
class EditBulletin extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditBulletin = EditBulletin;
exports.bulletin = new EditBulletin(BulletinAttributes_1.bulletinMap);
//# sourceMappingURL=EditBulletin.js.map