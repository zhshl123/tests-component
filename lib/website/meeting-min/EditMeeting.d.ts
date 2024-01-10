import { EditFromFields } from '../common/abstract';
export declare class EditMeeting extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    textInputFieldA: (fieldName: string) => any;
}
export declare const meeting: EditMeeting;
