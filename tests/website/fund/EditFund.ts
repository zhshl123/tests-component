import { isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { By, Click, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { fundAttributesMap } from './FundAttributes';

export class EditFund extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }

    EditIcon = () => 
        PageElements.located(By.css(`[class="clinktext"]`)).last()
            .describedAs('Edit icon')
    
    ClickEditIcon = () => {
        return Task.where(`#actor click the Edit icon `,
            Check.whether(
                this.EditIcon(), isPresent()
            ).andIfSo(
                Click.on(this.EditIcon()),
            ).otherwise(
                Log.the(`no data`)
            )
        )
    }
     
}

export const fund = new EditFund(fundAttributesMap)