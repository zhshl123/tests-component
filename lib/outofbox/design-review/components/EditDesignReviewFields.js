"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseDesignReview = exports.designReview = exports.EditCSPFields = void 0;
const abstract_1 = require("../../common/abstract");
const DesignReviewAttributes_1 = require("./DesignReviewAttributes");
class EditCSPFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCSPFields = EditCSPFields;
exports.designReview = new EditCSPFields(DesignReviewAttributes_1.DesignReviewAttributeMap);
exports.browseDesignReview = new abstract_1.SearchFromFields(DesignReviewAttributes_1.DesignReviewAttributeMap);
//# sourceMappingURL=EditDesignReviewFields.js.map