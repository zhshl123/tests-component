import { Ensure, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch, Text } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton, clickAllMultiCheckBox, clickButton, clickMessagePopupButton, messagePopupBox, messagePopupContent } from '../common';
import { EditFromFields } from '../common/abstract';
import { SearchFromFields } from '../common/abstract';
import { riskMap } from './RiskAttributes';

export class EditRisk extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    lookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
            .describedAs('lookup input field: ' + fieldName)
    }

    lookupDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('lookup dropdown list box: ' + fieldName)

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
                clickAllMultiCheckBox(),
                clickButton.using(OK)
            ),
        )
    }

    checkLooukupInputfieldIsEmpty = (fieldName: string) =>
        Task.where(`#actor lookup input field ${fieldName} is empty`,

            // 有值的情况
            Check.whether(this.lookupInputFieldSingleValue(fieldName), not(isPresent())
            ).andIfSo(
                Check.whether(
                    this.lookupInputFieldMultiValue(fieldName), not(isPresent())
                ).andIfSo(
                    // 空值情况下，点击查看下拉框
                    Click.on(this.lookupInputField(fieldName)),
                    // 确保下拉框有值之后再点击lookup图标
                    Ensure.eventually(this.lookupDropdownList(fieldName).first(), isVisible()),
                )

            )

        )

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }

    /**
     * check message popup is visible
     * @returns 
     */
    waitMessagePopupBoxVisible = () =>
        Task.where(`#actor check message popup box`,
            Wait.until(messagePopupBox(), isVisible()),

            Check.whether(
                Text.of(messagePopupContent()), includes('already')
            ).andIfSo(
                clickMessagePopupButton.using(OK),
                clickActionButton.using('Back')
            )

        )

}

export const risk = new EditRisk(riskMap)