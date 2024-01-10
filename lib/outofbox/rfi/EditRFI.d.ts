import { EditFromFields } from '../common/abstract';
export declare class EditRFI extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const RFI: EditRFI;
