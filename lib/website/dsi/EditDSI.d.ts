import { EditFromFields } from '../common/abstract';
export declare class EditDSI extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const DSI: EditDSI;
