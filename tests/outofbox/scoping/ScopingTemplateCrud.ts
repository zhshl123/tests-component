import { DataTable } from '@cucumber/cucumber'
import { Ensure, equals, isPresent, not } from '@serenity-js/assertions'
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core'
import { Attribute, Click, Cookie, DoubleClick, Enter, Switch, Text } from '@serenity-js/web'

import { ADD, OK, SAVE } from '../../DefaultStaticParams'
import { clickButton, clickSectionButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_SCOPING_TEMPLATE_NAME } from '../common/statics'
import { scopingTemplate } from './EditScopingTemplateFIelds'

export const saveScopingTemplateInfo = {
    using: (scopingTemplateInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor save scoping template information`,
            // general information
            scopingTemplate.fillTextInputField('Template Name', scopingTemplateInfo.rowsHash().TemplateName + timestamp),
            scopingTemplate.setCookie(COOKIE_SCOPING_TEMPLATE_NAME, scopingTemplateInfo.rowsHash().TemplateName + timestamp),
            scopingTemplate.fillTextInputField('Description', scopingTemplateInfo.rowsHash().Description),
            scopingTemplate.selectDropdownItem('Applicable Financial Type', scopingTemplateInfo.rowsHash().ApplicableFinancialType),

            // Set Scoping Period
            Click.on(scopingTemplate.checkbox('Period Option', Number(scopingTemplateInfo.rowsHash().PeriodOption))),
            Click.on(scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))),
            scopingTemplate.selectDropdownItem('Period Type', scopingTemplateInfo.rowsHash().PeriodType),
            Click.on(scopingTemplate.costScopingBasePeriodCheckbox(Number(scopingTemplateInfo.rowsHash().CostScopingBasePeriod))),

            // Available Attributes
            scopingTemplate.selectDropdownItem('Freezing Columns to the Left', scopingTemplateInfo.rowsHash().FreezingColumnstotheLeft),
            Check.whether(
                scopingTemplate.selectedAttributeTableColumn(1, 'Attribute'), isPresent()
            ).andIfSo(
                Log.the('available attribute already selected')
            ).otherwise(
                Click.on(scopingTemplate.availableAttribute(scopingTemplateInfo.rowsHash().AvailableAttributes)),
                Click.on(scopingTemplate.availableAttributeAddIcon()),
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(scopingTemplate.selectedAttributeTableColumn(1, 'Attribute'), isPresent()),
                Enter.theValue(scopingTemplateInfo.rowsHash().Width).into(scopingTemplate.selectedAttributeTableColumn(1, 'Width')),
                Check.whether(
                    Attribute.called('checked').of(scopingTemplate.selectedAttributeTableColumn(1, 'Is Required')), equals('checked')
                ).andIfSo(
                    Log.the('Is Required checkbox already checked')
                ).otherwise(
                    Click.on(scopingTemplate.selectedAttributeTableColumn(1, 'Is Required'))
                )
            ),

            // Select Available Nodes
            DoubleClick.on(scopingTemplate.availableNodeRootName(scopingTemplateInfo.rowsHash().AvailableAttributes)),
            Check.whether(
                Text.of(scopingTemplate.selectedAvailableNodeTableColumn(1, 'Node')), equals(scopingTemplateInfo.rowsHash().Node)
            ).andIfSo(
                Log.the(`node ${scopingTemplateInfo.rowsHash().SelectAvailableNodes} is selected`)
            ).otherwise(
                Click.on(scopingTemplate.availableNodeCheckbox(scopingTemplateInfo.rowsHash().SelectAvailableNodes)),
                Wait.for(Duration.ofSeconds(3)),
            ),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkScopingTemplateInfo = {
    using: (scopingTemplateInfo: DataTable) => {
        return Task.where(`#actor check scoping template information`,
            // general information
            Ensure.eventually(Attribute.called('value').of(scopingTemplate.textInputField('Template Name')), equals(Cookie.called(COOKIE_SCOPING_TEMPLATE_NAME).value())),
            Ensure.eventually(Attribute.called('title').of(scopingTemplate.dropdownField('Applicable Financial Type')), equals(scopingTemplateInfo.rowsHash().ApplicableFinancialType)),

            // Set Scoping Period
            Ensure.eventually(Attribute.called('checked').of(scopingTemplate.checkbox('Period Option', Number(scopingTemplateInfo.rowsHash().PeriodOption))), equals('checked')),
            Ensure.eventually(Attribute.called('checked').of(scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))), equals('checked')),
            Ensure.eventually(Attribute.called('disabled').of(scopingTemplate.dropdownField('Cost Scoping Base Period')), not(equals('disabled'))),
            Ensure.eventually(Attribute.called('title').of(scopingTemplate.dropdownField('Cost Scoping Base Period')), equals(scopingTemplateInfo.rowsHash().PeriodType)),
            // Available Attributes
            Ensure.eventually(Attribute.called('title').of(scopingTemplate.dropdownField('Freezing Columns to the Left')), equals(scopingTemplateInfo.rowsHash().FreezingColumnstotheLeft)),

            Ensure.eventually(Text.of(scopingTemplate.selectedAttributeTableColumn(1, 'Attribute')), equals(scopingTemplateInfo.rowsHash().Attribute)),
            Ensure.eventually(Attribute.called('value').of(scopingTemplate.selectedAttributeTableColumn(1, 'Width')), equals(scopingTemplateInfo.rowsHash().Width)),
            Ensure.eventually(Attribute.called('checked').of(scopingTemplate.selectedAttributeTableColumn(1, 'Is Required')), equals('checked')),
            // Select Available Nodes
            Ensure.eventually(Text.of(scopingTemplate.selectedAvailableNodeTableColumn(1, 'Node')), equals(scopingTemplateInfo.rowsHash().Node))
        )

    }
}

export const checkScopingTemplatePeriodInfo = {
    using: (scopingTemplateInfo: DataTable) => {
        return Task.where(`#actor check scoping template Cost Scoping Base Period information`,
            Ensure.eventually(Attribute.called('disabled').of(scopingTemplate.dropdownField('Cost Scoping Base Period')), not(equals('disabled'))),
            Ensure.eventually(Attribute.called('title').of(scopingTemplate.dropdownField('Cost Scoping Base Period')), equals(scopingTemplateInfo.rowsHash().PeriodType)),
        )

    }
}

export const checkScopingTemplatePeriodAndMethodInfo = {
    using: (scopingTemplateInfo: DataTable) => {
        return Task.where(`#actor check scoping template Cost Scoping Base Period and Cost Scoping Methodology information`,
            Ensure.eventually(Attribute.called('disabled').of(scopingTemplate.dropdownField('Cost Scoping Base Period')), equals('disabled')),
            Ensure.eventually(Attribute.called('checked').of(scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))), equals('checked')),
        )

    }
}

export const checkScopingTemplatePreviewTable = {
    using: (scopingTemplateInfo: DataTable) => {
        const array = scopingTemplateInfo.hashes()
        const headItems1 = array.shift()
        const headItems2 = array.shift()
        return Task.where(`#actor check scoping template preview table`,
            Ensure.eventually(Text.of(scopingTemplate.previewTableAttributeCell()), equals(headItems1.col2)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableTotalCell()), equals(array.pop().col2)),

            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 2)), equals(headItems1.col3)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 3)), equals(headItems1.col4)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 4)), equals(headItems1.col5)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 5)), equals(headItems1.col6)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 6)), equals(headItems1.col7)),

            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 0)), equals(headItems2.col3)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 1)), equals(headItems2.col4)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 2)), equals(headItems2.col5)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 3)), equals(headItems2.col6)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 4)), equals(headItems2.col7)),

        )

    }
}

export const updateScopingTemplateScopingBasePeriod = {
    using: (period: string) => {
        return Task.where(`#actor check scoping template Scoping Base Period with ${period}`,
            scopingTemplate.selectDropdownItem('Cost Scoping Base Period', period),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )

    }
}

export const updateScopingTemplatePeriodAndMethod = {
    using: (period: string, method: string) => {
        return Task.where(`#actor check scoping template Scoping Base Period with ${period} and Cost Scoping Methodology with ${method}`,
            Click.on(scopingTemplate.checkbox('Cost Scoping Methodology', Number(period))),
            Click.on(scopingTemplate.costScopingBasePeriodCheckbox(Number(method))),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )

    }
}

export const addScopingTemplateDetail = {
    using: (accountCode: string) => {
        return Task.where(`#actor add scoping template detail`,
            clickSectionButton.using(ADD),
            Wait.until(scopingTemplate.scopingTemplateDetailRow(), isPresent()),
            clickSectionButton.using('Lookup'),
            Wait.until(scopingTemplate.scopingTempleteDetailLookupPopup(), isPresent()),
            Switch.to(scopingTemplate.scopingTempleteDetailLookupPopup()).and(
                Click.on(scopingTemplate.accountCodeItem(accountCode)),
                Click.on(scopingTemplate.selectedAccountCodeItemCheckbox()),
                clickButton.using(OK)

            ),
            clickButton.using('Save Auto-loaded Row(s) Settings'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )

    }
}

export const checkScopingTemplatePreviewTableWithDetail = {
    using: (scopingTemplateInfo: DataTable) => {
        const array = scopingTemplateInfo.hashes()
        const detailItem = array.slice(2, 3)
        return Task.where(`#actor check scoping template preview table`,
            checkScopingTemplatePreviewTable.using(scopingTemplateInfo),
            Ensure.eventually(Attribute.called('value').of(scopingTemplate.scopingTemplateDetailInputField()), equals(detailItem[0].col2)),

        )

    }
}

export const checkScopingTemplatePreviewTable2 = {
    using: (scopingTemplateInfo: DataTable) => {
        const array = scopingTemplateInfo.hashes()
        const detailItem = array.slice(2, 3)
        const headItems1 = array.shift()
        const headItems2 = array.shift()
        return Task.where(`#actor check scoping template preview table`,
            Ensure.eventually(Text.of(scopingTemplate.previewTableAttributeCell()), equals(headItems1.col2)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableTotalCell()), equals(array.pop().col2)),
            Ensure.eventually(Attribute.called('value').of(scopingTemplate.scopingTemplateDetailInputField()), equals(detailItem[0].col2)),

            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 2)), equals(headItems1.col3)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 3)), equals(headItems1.col4)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 4)), equals(headItems1.col5)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 5)), equals(headItems1.col8)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems1.row), 6)), equals(headItems1.col11)),

            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 0)), equals(headItems2.col3)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 1)), equals(headItems2.col4)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 2)), equals(headItems2.col5)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 3)), equals(headItems2.col6)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 4)), equals(headItems2.col7)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 5)), equals(headItems2.col8)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 6)), equals(headItems2.col9)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 7)), equals(headItems2.col10)),
            Ensure.eventually(Text.of(scopingTemplate.previewTableCell(Number(headItems2.row), 8)), equals(headItems2.col11)),

        )

    }
}