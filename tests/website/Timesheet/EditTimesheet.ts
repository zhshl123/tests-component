import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { timesheetMap } from './TimesheetAttributes';

export class EditTimeSheet extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }

    selectLookupDropdownItem = (fieldName: string, itemName: string) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.lookupInputField(fieldName)),
            // 确保下拉框有值
            Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
            //点击下拉框的值
            Click.on(this.lookupDropdownItem(fieldName, itemName)),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    dropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

    dropdownListBox = (fieldName: string) =>
        PageElements.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist-list')).last()
            .describedAs('dropdown list box: ' + fieldName)

    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
            Click.on(this.dropdownItem(fieldName, itemName)),
        )
    }

}
export const timesheet = new EditTimeSheet(timesheetMap)