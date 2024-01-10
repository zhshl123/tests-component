"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopingTemplate = exports.EditScopingTemplateFIelds = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const ScopingTemplateAttributes_1 = require("./ScopingTemplateAttributes");
class EditScopingTemplateFIelds extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 普通文字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName);
        /**
         * 下拉框输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
                .describedAs(fieldName + ' dropdown field');
        };
        /**
         * 下拉框面板
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs(fieldName + ' dropdown list box');
        /**
         * 单选框
         * @param fieldName 字段名称
         * @param nthCheckbox 第一个选项为0，以此类推
         * @returns
         */
        this.checkbox = (fieldName, nthCheckbox) => web_1.PageElement.located(web_1.By.id('ctl00_body_rb' + this.entityMap.get(fieldName) + '_' + nthCheckbox))
            .describedAs(`field ${fieldName}: ${nthCheckbox}th checkbox`);
        /**
         * Cost Scoping Base Period的单选框
         * @param nthCheckbox 第一个选项为0，以此类推
         * @returns
         */
        this.costScopingBasePeriodCheckbox = (nthCheckbox) => web_1.PageElement.located(web_1.By.id('rbPeriodType' + nthCheckbox))
            .describedAs(`${nthCheckbox}th Cost Scoping Base Period checkbox`);
        this.availableAttribute = (itemName) => web_1.PageElement.located(web_1.By.cssContainingText('#ctl00_body_ucTemplateField1_lstAttributes option', itemName))
            .describedAs('avalable attribute: ' + itemName);
        this.availableAttributeAddIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucTemplateField1_btnAddClassification'))
            .describedAs('available attribute icon');
        this.selectedAttributeTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucTemplateField1_dgSelClassifications'))
            .describedAs('selected attribute table');
        /**
         * selected Attribute表的行
         * @param rowNumber 行号，含表头，第一行为0
         * @returns
         */
        this.selectedAttributeTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr')).nth(rowNumber)
            .of(this.selectedAttributeTable())
            .describedAs(`selected attribute table row: ${rowNumber} `);
        /**
         * selected Attribute表的attribute单元格
         * @param rowNumber 行号，含表头，第一行为0
         * @param fieldName 列名
         * @returns
         */
        this.selectedAttributeTableColumn = (rowNumber, columnName) => {
            const rowCellNumber = rowNumber + 1;
            return web_1.PageElement.located(web_1.By.id('ctl00_body_ucTemplateField1_dgSelClassifications_ctl0' + rowCellNumber + '_' + this.entityMap.get(columnName)))
                .of(this.selectedAttributeTableRow(rowNumber))
                .describedAs(`selected attribute table row ${columnName} column`);
        };
        this.availableNodeRoot = () => web_1.PageElement.located(web_1.By.id('ctl00bodyucTemplateField1wtvUnNodes_1'))
            .describedAs('available root node');
        this.availableNodeRootName = (itemName) => web_1.PageElement.located(web_1.By.cssContainingText('span', itemName))
            .of(this.availableNodeRoot())
            .describedAs('available root node name:' + itemName);
        this.availableNodeRootCheckbox = () => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.availableNodeRoot())
            .describedAs('available root node checkbox');
        this.availableNodeListBox = () => web_1.PageElement.located(web_1.By.id('M_ctl00bodyucTemplateField1wtvUnNodes_1'))
            .describedAs('available node list box');
        this.availableNodeList = () => web_1.PageElements.located(web_1.By.css('div'))
            .of(this.availableNodeListBox())
            .describedAs('available node list box');
        /**
         * selected Available Node的node节点
         * @param nodeNumber 第几个节点， 第一个为1，以此类推
         * @returns
         */
        this.availableNode = (nodeNumber) => web_1.PageElement.located(web_1.By.id('ctl00bodyucTemplateField1wtvUnNodes_1_' + nodeNumber))
            .describedAs(`available node: ${nodeNumber}`);
        /**
         * selected Available Node表的node节点名称
         * @param nodeNumber 第几个节点， 第一个为1，以此类推
         * @param nodeName 节点名称
         * @returns
         */
        this.availableNodeName = (nodeNumber, nodeName) => web_1.PageElement.located(web_1.By.cssContainingText('span', nodeName))
            .of(this.availableNode(nodeNumber))
            .describedAs(`available node: ${nodeNumber} name ${nodeName}`);
        /**
         * selected Available Node表的node节点名称
         * @param nodeNumber 第几个节点， 第一个为1，以此类推
         * @param nodeName 节点名称
         * @returns
         */
        this.availableNodeCheckbox = (nodeNumber) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.availableNode(nodeNumber))
            .describedAs(`available node: ${nodeNumber} checkbox`);
        this.selectedAvailableNodeTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucTemplateField1_dgSelectedNodes'))
            .describedAs('selected available node table');
        /**
         * selected Available Node表的行
         * @param rowNumber 包含首行，第一行为0，以此类推
         * @returns
         */
        this.selectedAvailableNodeTableRow = (rowNumber) => web_1.PageElement.located(web_1.By.css('tr'))
            .of(this.selectedAvailableNodeTable())
            .describedAs(`selected available node table ${rowNumber} row`);
        /**
         * selected Available Node表的单元格
         * @param rowNumber 包含首行，第一行为0，以此类推
         * @param columnName 列名
         */
        this.selectedAvailableNodeTableColumn = (rowNumber, columnName) => {
            const rowCellNumber = rowNumber + 1;
            return web_1.PageElement.located(web_1.By.id('ctl00_body_ucTemplateField1_dgSelectedNodes_ctl0' + rowCellNumber + '_' + this.entityMap.get(columnName)))
                .of(this.selectedAvailableNodeTableRow(rowNumber))
                .describedAs(`selected available node table ${rowNumber} row`);
        };
        this.scopingTemplateDetailRow = () => web_1.PageElement.located(web_1.By.css(`[templatelineitemautoid="0"]`))
            .describedAs('scoping template detail row');
        this.scopingTemplateDetailInputField = () => web_1.PageElement.located(web_1.By.css(`[customcolumn="1"]`))
            .describedAs('scoping template detail row');
        this.scopingTempleteDetailLookupPopup = () => web_1.PageElement.located(web_1.By.css('.modalPopup.cmodal iframe'))
            .describedAs('scoping teplate detail lookup popup');
        this.accountCodeItem = (itemName) => web_1.PageElement.located(web_1.By.cssContainingText('#ctl00_body_docTreeview_treeview span', itemName))
            .describedAs('Account Code item');
        this.selectedAccountCodeItem = () => web_1.PageElement.located(web_1.By.id('ctl00_body_docTreeview_treeview_tv_active'));
        this.selectedAccountCodeItemCheckbox = () => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.selectedAccountCodeItem());
        /******************************** preview tab 页面******************************** */
        this.previewTable = () => web_1.PageElement.located(web_1.By.css('.cdatagrid'))
            .describedAs('template preview table');
        /**
         * preview表的行，
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @returns
         */
        this.previewTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('tr'))
            .nth(rowNumber)
            .of(this.previewTable())
            .describedAs('template preview table row:' + rowNumber);
        /**
         * preview表的单元格，含表头，第一行为0， 以此类推
         * @param rowNumber 含表头，第一行为0， 以此类推
         * @param colNumber 列序号，第一列为0，以此类推
         * @returns
         */
        this.previewTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css('td'))
            .nth(colNumber)
            .of(this.previewTableRow(rowNumber))
            .describedAs(`template preview table row:${rowNumber}, col:${colNumber} cell`);
        /**
         * preview表的自定义attribute列
         * @returns
         */
        this.previewTableAttributeCell = () => web_1.PageElement.located(web_1.By.css('div'))
            .of(this.previewTableCell(0, 1))
            .describedAs('template preview table attribute cell');
        /**
         * preview表的自定义attribute列的必填标记
         * @returns
         */
        this.previewTableAttributeCellIsRequiredIcon = () => web_1.PageElement.located(web_1.By.css('span.star'))
            .of(this.previewTableCell(0, 1))
            .describedAs('template preview table attribute cell');
        /**
         * preview表的Total列
         * @returns
         */
        this.previewTableTotalCell = () => web_1.PageElements.located(web_1.By.css('td'))
            .nth(1)
            .of(web_1.PageElements.located(web_1.By.css('tfoot tr')).last())
            .describedAs('template preview table Total cell');
    }
}
exports.EditScopingTemplateFIelds = EditScopingTemplateFIelds;
exports.scopingTemplate = new EditScopingTemplateFIelds(ScopingTemplateAttributes_1.scopingTemplateAttributesMap);
//# sourceMappingURL=EditScopingTemplateFIelds.js.map