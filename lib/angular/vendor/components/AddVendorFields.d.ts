import { EditFromFields } from '../../common/abstract';
export declare class AddVendorFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
 * 字段的输入框组合（包含字段名和输入框）
 * @param fieldName 字段名称
 * @returns
 */
    attributeFieldGroup: (fieldName: string) => any;
}
export declare const vendorAdd: AddVendorFields;
