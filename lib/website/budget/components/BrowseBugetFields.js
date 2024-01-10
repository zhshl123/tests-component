"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseBudget = exports.BrowseBudgetFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const BudgetAttributes_1 = require("./BudgetAttributes");
class BrowseBudgetFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchItemWithFundAndProjetct = (pageName, conditons) => core_1.Task.where(`#actor search budget with ${conditons}`, common_1.openPage.using(pageName), this.selectItemInlookupPopup('Associated Project', conditons.get('Associated Project'), 'Project Name'), this.selectItemInlookupPopup('Fund', conditons.get('Fund'), 'Fund ID'), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        /**
         * 选择fiscal year
         * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
         * @param itemName 要选择的值
         * @returns
         */
        this.selectFiscalYearDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup dropdown list`, web_1.Click.on(this.fiscalYearDropdownInputField(fieldName)), assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName), (0, assertions_1.isPresent)()), web_1.Enter.theValue(itemName).into(this.fiscalYearDropdownInputField(fieldName)), assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName), (0, assertions_1.isPresent)()), web_1.Click.on(this.fiscalYearDropdownItem(fieldName, itemName)));
        };
        /**
         * Fiscal Year的两个搜索框
         * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
         * @returns
         */
        this.fiscalYearDropdownInputField = (fieldName) => web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_A0_FiscalYear_ddl${fieldName}_listbox"]`))
            .describedAs('Fiscal Year dropdown input field');
        this.fiscalYearDropdownBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_FiscalYear_ddl' + fieldName + '-list'))
            .describedAs('Fiscal Year dropdown box');
        this.fiscalYearDropdownList = (fieldName) => web_1.PageElement.located(web_1.By.css('li'))
            .of(this.fiscalYearDropdownBox(fieldName))
            .describedAs('Fiscal Year dropdown list');
        this.fiscalYearDropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.cssContainingText('span', itemName))
            .of(this.fiscalYearDropdownBox(fieldName))
            .describedAs('Fiscal Year dropdown item');
        this.selectAllCheckBoxInBudgetGrid = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvBudget_head_GridView_HearderCheckBox'))
            .describedAs('select all checkbox in budget grid');
        this.deleteSelectedIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvBudget_ctl01_btnDeleteSelected'))
            .describedAs('delete selected icon');
    }
}
exports.BrowseBudgetFields = BrowseBudgetFields;
exports.browseBudget = new BrowseBudgetFields(BudgetAttributes_1.budgetAttributesMap);
//# sourceMappingURL=BrowseBugetFields.js.map