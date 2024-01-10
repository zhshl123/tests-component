import { EditFromFields } from '../common/abstract';
export declare class EditBulletin extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const bulletin: EditBulletin;
