
import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class EvaluatorsFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }
}

export const evaluatorsFields = new EvaluatorsFields(solicitationAttributesMap)