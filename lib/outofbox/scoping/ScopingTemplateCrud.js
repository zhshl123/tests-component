"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScopingTemplatePreviewTable2 = exports.checkScopingTemplatePreviewTableWithDetail = exports.addScopingTemplateDetail = exports.updateScopingTemplatePeriodAndMethod = exports.updateScopingTemplateScopingBasePeriod = exports.checkScopingTemplatePreviewTable = exports.checkScopingTemplatePeriodAndMethodInfo = exports.checkScopingTemplatePeriodInfo = exports.checkScopingTemplateInfo = exports.saveScopingTemplateInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditScopingTemplateFIelds_1 = require("./EditScopingTemplateFIelds");
exports.saveScopingTemplateInfo = {
    using: (scopingTemplateInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor save scoping template information`, 
        // general information
        EditScopingTemplateFIelds_1.scopingTemplate.fillTextInputField('Template Name', scopingTemplateInfo.rowsHash().TemplateName + timestamp), EditScopingTemplateFIelds_1.scopingTemplate.setCookie(statics_1.COOKIE_SCOPING_TEMPLATE_NAME, scopingTemplateInfo.rowsHash().TemplateName + timestamp), EditScopingTemplateFIelds_1.scopingTemplate.fillTextInputField('Description', scopingTemplateInfo.rowsHash().Description), EditScopingTemplateFIelds_1.scopingTemplate.selectDropdownItem('Applicable Financial Type', scopingTemplateInfo.rowsHash().ApplicableFinancialType), 
        // Set Scoping Period
        web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Period Option', Number(scopingTemplateInfo.rowsHash().PeriodOption))), web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))), EditScopingTemplateFIelds_1.scopingTemplate.selectDropdownItem('Period Type', scopingTemplateInfo.rowsHash().PeriodType), web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.costScopingBasePeriodCheckbox(Number(scopingTemplateInfo.rowsHash().CostScopingBasePeriod))), 
        // Available Attributes
        EditScopingTemplateFIelds_1.scopingTemplate.selectDropdownItem('Freezing Columns to the Left', scopingTemplateInfo.rowsHash().FreezingColumnstotheLeft), core_1.Check.whether(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Attribute'), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('available attribute already selected')).otherwise(web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.availableAttribute(scopingTemplateInfo.rowsHash().AvailableAttributes)), web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.availableAttributeAddIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Attribute'), (0, assertions_1.isPresent)()), web_1.Enter.theValue(scopingTemplateInfo.rowsHash().Width).into(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Width')), core_1.Check.whether(web_1.Attribute.called('checked').of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Is Required')), (0, assertions_1.equals)('checked')).andIfSo(core_1.Log.the('Is Required checkbox already checked')).otherwise(web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Is Required')))), 
        // Select Available Nodes
        web_1.DoubleClick.on(EditScopingTemplateFIelds_1.scopingTemplate.availableNodeRootName(scopingTemplateInfo.rowsHash().AvailableAttributes)), core_1.Check.whether(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAvailableNodeTableColumn(1, 'Node')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().Node)).andIfSo(core_1.Log.the(`node ${scopingTemplateInfo.rowsHash().SelectAvailableNodes} is selected`)).otherwise(web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.availableNodeCheckbox(scopingTemplateInfo.rowsHash().SelectAvailableNodes)), core_1.Wait.for(core_1.Duration.ofSeconds(3))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingTemplateInfo = {
    using: (scopingTemplateInfo) => {
        return core_1.Task.where(`#actor check scoping template information`, 
        // general information
        assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(EditScopingTemplateFIelds_1.scopingTemplate.textInputField('Template Name')), (0, assertions_1.equals)(web_1.Cookie.called(statics_1.COOKIE_SCOPING_TEMPLATE_NAME).value())), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Applicable Financial Type')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().ApplicableFinancialType)), 
        // Set Scoping Period
        assertions_1.Ensure.eventually(web_1.Attribute.called('checked').of(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Period Option', Number(scopingTemplateInfo.rowsHash().PeriodOption))), (0, assertions_1.equals)('checked')), assertions_1.Ensure.eventually(web_1.Attribute.called('checked').of(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))), (0, assertions_1.equals)('checked')), assertions_1.Ensure.eventually(web_1.Attribute.called('disabled').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Cost Scoping Base Period')), (0, assertions_1.not)((0, assertions_1.equals)('disabled'))), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Cost Scoping Base Period')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().PeriodType)), 
        // Available Attributes
        assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Freezing Columns to the Left')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().FreezingColumnstotheLeft)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Attribute')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().Attribute)), assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Width')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().Width)), assertions_1.Ensure.eventually(web_1.Attribute.called('checked').of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAttributeTableColumn(1, 'Is Required')), (0, assertions_1.equals)('checked')), 
        // Select Available Nodes
        assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.selectedAvailableNodeTableColumn(1, 'Node')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().Node)));
    }
};
exports.checkScopingTemplatePeriodInfo = {
    using: (scopingTemplateInfo) => {
        return core_1.Task.where(`#actor check scoping template Cost Scoping Base Period information`, assertions_1.Ensure.eventually(web_1.Attribute.called('disabled').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Cost Scoping Base Period')), (0, assertions_1.not)((0, assertions_1.equals)('disabled'))), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Cost Scoping Base Period')), (0, assertions_1.equals)(scopingTemplateInfo.rowsHash().PeriodType)));
    }
};
exports.checkScopingTemplatePeriodAndMethodInfo = {
    using: (scopingTemplateInfo) => {
        return core_1.Task.where(`#actor check scoping template Cost Scoping Base Period and Cost Scoping Methodology information`, assertions_1.Ensure.eventually(web_1.Attribute.called('disabled').of(EditScopingTemplateFIelds_1.scopingTemplate.dropdownField('Cost Scoping Base Period')), (0, assertions_1.equals)('disabled')), assertions_1.Ensure.eventually(web_1.Attribute.called('checked').of(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Cost Scoping Methodology', Number(scopingTemplateInfo.rowsHash().CostScopingMethodology))), (0, assertions_1.equals)('checked')));
    }
};
exports.checkScopingTemplatePreviewTable = {
    using: (scopingTemplateInfo) => {
        const array = scopingTemplateInfo.hashes();
        const headItems1 = array.shift();
        const headItems2 = array.shift();
        return core_1.Task.where(`#actor check scoping template preview table`, assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableAttributeCell()), (0, assertions_1.equals)(headItems1.col2)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableTotalCell()), (0, assertions_1.equals)(array.pop().col2)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 2)), (0, assertions_1.equals)(headItems1.col3)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 3)), (0, assertions_1.equals)(headItems1.col4)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 4)), (0, assertions_1.equals)(headItems1.col5)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 5)), (0, assertions_1.equals)(headItems1.col6)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 6)), (0, assertions_1.equals)(headItems1.col7)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 0)), (0, assertions_1.equals)(headItems2.col3)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 1)), (0, assertions_1.equals)(headItems2.col4)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 2)), (0, assertions_1.equals)(headItems2.col5)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 3)), (0, assertions_1.equals)(headItems2.col6)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 4)), (0, assertions_1.equals)(headItems2.col7)));
    }
};
exports.updateScopingTemplateScopingBasePeriod = {
    using: (period) => {
        return core_1.Task.where(`#actor check scoping template Scoping Base Period with ${period}`, EditScopingTemplateFIelds_1.scopingTemplate.selectDropdownItem('Cost Scoping Base Period', period), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.updateScopingTemplatePeriodAndMethod = {
    using: (period, method) => {
        return core_1.Task.where(`#actor check scoping template Scoping Base Period with ${period} and Cost Scoping Methodology with ${method}`, web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.checkbox('Cost Scoping Methodology', Number(period))), web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.costScopingBasePeriodCheckbox(Number(method))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.addScopingTemplateDetail = {
    using: (accountCode) => {
        return core_1.Task.where(`#actor add scoping template detail`, common_1.clickSectionButton.using(DefaultStaticParams_1.ADD), core_1.Wait.until(EditScopingTemplateFIelds_1.scopingTemplate.scopingTemplateDetailRow(), (0, assertions_1.isPresent)()), common_1.clickSectionButton.using('Lookup'), core_1.Wait.until(EditScopingTemplateFIelds_1.scopingTemplate.scopingTempleteDetailLookupPopup(), (0, assertions_1.isPresent)()), web_1.Switch.to(EditScopingTemplateFIelds_1.scopingTemplate.scopingTempleteDetailLookupPopup()).and(web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.accountCodeItem(accountCode)), web_1.Click.on(EditScopingTemplateFIelds_1.scopingTemplate.selectedAccountCodeItemCheckbox()), common_1.clickButton.using(DefaultStaticParams_1.OK)), common_1.clickButton.using('Save Auto-loaded Row(s) Settings'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingTemplatePreviewTableWithDetail = {
    using: (scopingTemplateInfo) => {
        const array = scopingTemplateInfo.hashes();
        const detailItem = array.slice(2, 3);
        return core_1.Task.where(`#actor check scoping template preview table`, exports.checkScopingTemplatePreviewTable.using(scopingTemplateInfo), assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(EditScopingTemplateFIelds_1.scopingTemplate.scopingTemplateDetailInputField()), (0, assertions_1.equals)(detailItem[0].col2)));
    }
};
exports.checkScopingTemplatePreviewTable2 = {
    using: (scopingTemplateInfo) => {
        const array = scopingTemplateInfo.hashes();
        const detailItem = array.slice(2, 3);
        const headItems1 = array.shift();
        const headItems2 = array.shift();
        return core_1.Task.where(`#actor check scoping template preview table`, assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableAttributeCell()), (0, assertions_1.equals)(headItems1.col2)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableTotalCell()), (0, assertions_1.equals)(array.pop().col2)), assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(EditScopingTemplateFIelds_1.scopingTemplate.scopingTemplateDetailInputField()), (0, assertions_1.equals)(detailItem[0].col2)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 2)), (0, assertions_1.equals)(headItems1.col3)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 3)), (0, assertions_1.equals)(headItems1.col4)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 4)), (0, assertions_1.equals)(headItems1.col5)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 5)), (0, assertions_1.equals)(headItems1.col8)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems1.row), 6)), (0, assertions_1.equals)(headItems1.col11)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 0)), (0, assertions_1.equals)(headItems2.col3)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 1)), (0, assertions_1.equals)(headItems2.col4)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 2)), (0, assertions_1.equals)(headItems2.col5)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 3)), (0, assertions_1.equals)(headItems2.col6)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 4)), (0, assertions_1.equals)(headItems2.col7)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 5)), (0, assertions_1.equals)(headItems2.col8)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 6)), (0, assertions_1.equals)(headItems2.col9)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 7)), (0, assertions_1.equals)(headItems2.col10)), assertions_1.Ensure.eventually(web_1.Text.of(EditScopingTemplateFIelds_1.scopingTemplate.previewTableCell(Number(headItems2.row), 8)), (0, assertions_1.equals)(headItems2.col11)));
    }
};
//# sourceMappingURL=ScopingTemplateCrud.js.map