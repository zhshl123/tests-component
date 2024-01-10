import { Question } from '@serenity-js/core';
import { Attribute, By, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { scheduleAttributeMap } from './ScheduleAttributes';

export class EditScheduleFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    scheduleGridTable = () =>
        PageElement.located(By.id('ctl00_body_dgSchedule'))
            .describedAs('schedule grid table')

    scheduleGridCheckbox = (itemName: string | Question<any>) => {
        return PageElement.located(By.id(Attribute.called('id').of(this.scheduleNameCellInGrid(itemName)).replace('_lblScheduleName', '_GridView_ItemCheckBox')))
            .describedAs(`schedule name: ${itemName} checkbox`)
    }

    scheduleNameCellInGrid = (itemName: string | Question<any>) => {
        return PageElements.located(By.cssContainingText('span', itemName))
            .first()
            .of(this.scheduleGridTable())
            .describedAs(`schedule name: ${itemName} cell in grid`)
    }

    scheduleGridTableBody = () => {
        return PageElements.located(By.css('.cstdgrid__bodyrow'))
            .of(this.scheduleGridTable())
            .describedAs(`schedule grid table body`)
    }

    buttonInGridList = (buttonName: string, rowNumber: number) => {
        return PageElements.located(By.css(`[title="${buttonName}"]`))
            .nth(rowNumber)
            .of(this.scheduleGridTable())
            .describedAs(`row: ${rowNumber} button ${buttonName} in grid`)
    }


}

export const schedule = new EditScheduleFields(scheduleAttributeMap)