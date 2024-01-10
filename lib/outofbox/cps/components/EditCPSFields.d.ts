import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditCPSFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const cps: EditCPSFields;
export declare const browseCps: SearchFromFields;
