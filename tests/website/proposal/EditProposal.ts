import { Task } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { proposalMap } from './ProposalAttributes';

export class EditProposal extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of New Public Proposal')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }

}

export const proposal = new EditProposal(proposalMap)