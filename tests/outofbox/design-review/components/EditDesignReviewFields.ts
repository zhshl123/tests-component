import { EditFromFields, SearchFromFields } from "../../common/abstract";
import { DesignReviewAttributeMap } from "./DesignReviewAttributes";

export class EditCSPFields extends EditFromFields {

    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const designReview = new EditCSPFields(DesignReviewAttributeMap)
export const browseDesignReview = new SearchFromFields(DesignReviewAttributeMap)