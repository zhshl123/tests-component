import { EditFromFields } from '../../common/abstract';
export declare class EditVendorFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    emailNotificationsCheckBox: () => any;
    clickEmailNotificationsCheckBox: (isSelected: string) => any;
    countryStateloadingIcon: () => any;
}
export declare const vendor: EditVendorFields;
