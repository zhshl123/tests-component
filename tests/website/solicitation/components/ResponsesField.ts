
import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class ResponsesFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }
}

export const responsesFields = new ResponsesFields(solicitationAttributesMap)