
import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class RankingPhaseFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }

}

export const rankingphaseFields = new RankingPhaseFields(solicitationAttributesMap)