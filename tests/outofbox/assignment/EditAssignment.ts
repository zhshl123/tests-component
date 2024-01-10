import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton } from '../common';
import { clickAllMultiCheckBox } from '../common';
import { EditFromFields } from '../common/abstract';
import { SearchFromFields } from '../common/abstract';
import { AssignmentMap } from './AssignmentAttributes';

export class EditAssignment extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    lookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
            .describedAs('lookup input field: ' + fieldName)
    }

    dropdownItemLast = (fieldName, itemName: string | Question<any>) =>
        PageElements.located(By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

    selectDropdownItemLast = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Wait.for(Duration.ofSeconds(3)),
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(this.dropdownItemLast(fieldName, itemName).last()),
        )
    }

    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(this.lookupIcon(fieldName)),
            Wait.for(Duration.ofSeconds(3)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                searchForm.checkSearchResult(itemName, SUCCEEDED),
                // 点击单选框的第一个选项
                clickAllMultiCheckBox(),
                clickButton.using(OK)
            ),
        )
    }

    GeneralTab = () => {
        return PageElement.located(By.css(`[Tabid="1"]`))
            .describedAs('General Tab')
    }
    clickGeneralTab = () => {
        return Task.where(`#actor click General Tab`,
            Click.on(this.GeneralTab())
        )
    }
    textInputFieldA = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName)
}

export const Assignment = new EditAssignment(AssignmentMap)