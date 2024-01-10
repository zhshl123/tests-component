import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EntityResourceFieldds extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    searchFormTextInputField: (fieldName: string) => any;
    addResourceIcon: () => any;
    selectResourcePopup: () => any;
    multiCheckBoxInPopup: (resourceName: string) => any;
    resourceListBox: () => any;
    resourceList: () => any;
    emptyResourceList: () => any;
    firstDeleteIconInList: () => any;
    /**
       * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
       * @param fieldName 字段名称
       * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
       * @param popupFieldName 在弹窗中填入关键词的字段名
       * @returns
       */
    selectResourceInPopup: (fieldName: string, itemName: string) => any;
}
export declare const entityResource: EntityResourceFieldds;
export declare const browseEntityResource: SearchFromFields;
