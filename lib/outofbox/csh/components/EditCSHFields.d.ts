import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditCSHFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const csh: EditCSHFields;
export declare const browseCsh: SearchFromFields;
