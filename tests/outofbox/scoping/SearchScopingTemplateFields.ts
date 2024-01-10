import { By, PageElement } from '@serenity-js/web';

import { SearchFromFields } from '../common/abstract';
import { scopingTemplateAttributesMap } from './ScopingTemplateAttributes';

export class SearchScopingTemplateFIelds extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName)

    /**
     * 列表首行的edit图标
     * @returns 
     */
    editIconInGrid = () =>
        PageElement.located(By.id('ctl00_body_dgTemplates_ctl03_lnkEdit'))
            .describedAs('edit icon in grid first row')
}

export const browseScopingTemplate = new SearchScopingTemplateFIelds(scopingTemplateAttributesMap)