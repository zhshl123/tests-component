import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, isVisible, Switch } from '@serenity-js/web';

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { checkGridList, clickAllMultiCheckBox, clickButton } from '../common';
import { COOKIE_PROJECT_NAME } from '../common/statics';
import { timesheetMap } from './TimesheetAttributes';

export class BrowseTimesheet extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        return Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`,

            Click.on(this.lookupInputField(fieldName)),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                this.fillTextInputField(popupFieldName, itemName),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                this.checkSearchResult(itemName, SUCCEEDED),
                // 点击多选框的全选
                clickAllMultiCheckBox(),
                clickButton.using(OK)
            ),
            clickButton.using(SEARCH),

        )

    }

    searchLookupInBrowsePage = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            this.selectItemInlookupPopup(fieldName, Cookie.called(COOKIE_PROJECT_NAME).value(), 'Project Name'),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )
    }
}

export const browseTimesheetInfo = new BrowseTimesheet(timesheetMap)