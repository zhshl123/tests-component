/* eslint-disable unicorn/filename-case */
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickFirstMultiCheckBox } from '../common';
import { EditFromFields } from '../common/abstract';
import { SearchFromFields } from '../common/abstract';
import { IRMap } from './IRAttributes';

export class EditIR extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    lookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
            .describedAs('lookup input field: ' + fieldName)
    }

    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName),

            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                searchForm.checkSearchResult(itemName, SUCCEEDED),
                clickFirstMultiCheckBox(),
                clickButton.using(OK)
            ),
        )
    }

    dropdownListBox = (fieldName: string) =>
        PageElements.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox')).last()
            .describedAs('dropdown list box: ' + fieldName)

    selectDropdownItemA = (fieldName: string, itemName: string) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Check.whether(
                this.dropdownField(fieldName), isPresent()
            ).andIfSo(
                Click.on(this.dropdownField(fieldName)),
                // 确保下拉框有值之后再点击对应选项
                Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
                Click.on(this.dropdownItemA(fieldName, itemName)),
            ).otherwise(
                Log.the(`field: ${fieldName} not present`)
            )
        )
    }

    dropdownItemA = (fieldName: string, itemName: string) => {
        const mappedFieldName = this.entityMap.get(itemName)
        return PageElement.located(By.css(`[data-offset-index="${mappedFieldName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)
    }

    textInputFieldA = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName)
}

export const IR = new EditIR(IRMap)