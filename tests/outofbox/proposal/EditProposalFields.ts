import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web';

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickFirstMultiCheckBox } from '../common';
import { EditFromFields, SearchFromFields } from '../common/abstract';
import { proposalAttributeMap } from './ProposalAttributes';

export class EditProposalFields extends EditFromFields {
    entityMap: Map<string, string>
    proposalName: string
    cycle: string
    scenario: string
    constructor(entityMap) {
        super(entityMap);

    }

    /**
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns 
     */
    lookupInputFieldUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName)

    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
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

    /*************************** copy selected proposal 弹窗******************************** */
    copySelectedProposalPopup = () =>
        PageElement.located(By.id('divExportCurrentCycleProjects'))
            .describedAs('copy selected proposal popup')

    copySelectedProposalDropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
            .describedAs('copy selected proposal popup dropdown field: ' + fieldName)
    }

    copySelectedProposalDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('copy selected proposal popup dropdown list box: ' + fieldName)

    copySelectedProposalDropdownList = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.copySelectedProposalDropdownListBox(fieldName))
            .describedAs('copy selected proposal popup dropdown list: ' + fieldName)

    copySelectedProposalDropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.copySelectedProposalDropdownListBox(fieldName))
            .describedAs('copy selected proposal popup dropdown item: ' + itemName)

    selectCopySelectedProposalDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects copy selected proposal popup dropdown item: ${itemName}`,
            Click.on(this.copySelectedProposalDropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.copySelectedProposalDropdownList(fieldName).first(), isPresent()),
            Click.on(this.copySelectedProposalDropdownItem(fieldName, itemName)),
        )
    }

    copySelectedProposalScopingCheckbox = () =>
        PageElement.located(By.id('ctl00_body_chkScoping'))
            .describedAs('copy selected proposal popup scoping checkbox')

    copySelectedProposalOKButton = () =>
        PageElement.located(By.id('ctl00_body_btnOK'))
            .describedAs('copy selected proposal popup Ok button')

}

export const proposal = new EditProposalFields(proposalAttributeMap)