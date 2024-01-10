
import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch, Text } from '@serenity-js/web';

import { OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButton, clickFirstMultiCheckBox, clickMessagePopupButton, messagePopupBox, messagePopupContent } from '../../common';
import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { projectAttributesMap } from './ProjectAttributes';

export class EditProjectFields extends EditFromFields {
    entityMap: Map<string, string>
    timestamp: string
    cycle: string
    scenario: string
    pprojectName: string
    constructor(entityMap) {
        super(entityMap);

    }

    addMasterProjectButton = () =>
        PageElement.located(By.css(`[value="Add Master Project"]`))
            .describedAs('Add Master Project' + 'button')

    /**
     * check message popup is visible
     * @returns 
     */
    waitMessagePopupBoxVisible = () =>
        Task.where(`#actor check message popup box`,
            Wait.until(messagePopupBox(), isVisible()),
            Check.whether(
                Text.of(messagePopupContent()), includes('Duplicate')
            ).andIfSo(
                clickMessagePopupButton.using(OK),

            )
        )

    firstExpandIconInGrid = () =>
        PageElement.located(By.id('ctl00_body_dgImplementedProjects_ctl03_imgExpand'))
            .describedAs('first expend icon in grid')



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

    /**
     * 下拉列表的值
     * @param fieldName 字段名称
     * @param itemName 具体的选项名称
     * @returns 
     */
    dropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElement.located(By.cssContainingText('span', itemName))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

    projectStructureTree = () =>
        PageElement.located(By.id('ctl00_body_iprjTreeview_treeview'))
            .describedAs('project structure tree')

    projectStructureTreeBranch = (projectName: string | Question<any>) =>
        PageElement.located(By.cssContainingText('span', projectName))
            .of(this.projectStructureTree())
            .describedAs('project structure tree branch ' + projectName)

    /*************************** copy selected project 弹窗******************************** */
    copySelectedProjectPopup = () =>
        PageElement.located(By.id('divExportCurrentCycleProjects'))
            .describedAs('copy selected project popup')

    copySelectedProjectDropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
            .describedAs('copy selected project popup dropdown field: ' + fieldName)
    }

    copySelectedProjectDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('copy selected project popup dropdown list box: ' + fieldName)

    copySelectedProjectDropdownList = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.copySelectedProjectDropdownListBox(fieldName))
            .describedAs('copy selected project popup dropdown list: ' + fieldName)

    copySelectedProjectDropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.copySelectedProjectDropdownListBox(fieldName))
            .describedAs('copy selected project popup dropdown item: ' + itemName)

    selectCopySelectedProjectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects copy selected project popup dropdown item: ${itemName}`,
            Click.on(this.copySelectedProjectDropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.copySelectedProjectDropdownList(fieldName).first(), isPresent()),
            Click.on(this.copySelectedProjectDropdownItem(fieldName, itemName)),
        )
    }

    copySelectedProjectScopingCheckbox = () =>
        PageElement.located(By.id('ctl00_body_chkScoping'))
            .describedAs('copy selected project popup scoping checkbox')

    copySelectedProjectOKButton = () =>
        PageElement.located(By.id('ctl00_body_btnOK'))
            .describedAs('copy selected project popup Ok button')
}

export const project = new EditProjectFields(projectAttributesMap)
