import { isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { By, Click, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { transferMap } from './TransferAttributes';

export class EditTransfer extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Check.whether(
                this.NewScopingAreaEditIcon(), isPresent()
            ).andIfSo(
                Click.on(this.NewScopingAreaEditIcon())
            ).otherwise(
                Log.the(`New Edit Icon not present`)
            )
        )
    }
}
export const transfer = new EditTransfer(transferMap)