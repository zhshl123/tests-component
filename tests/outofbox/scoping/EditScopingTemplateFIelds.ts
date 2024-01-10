import { By, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { scopingTemplateAttributesMap } from './ScopingTemplateAttributes';

export class EditScopingTemplateFIelds extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName)

    /**
     * 下拉框输入框
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
            .describedAs(fieldName + ' dropdown field')
    }

    /**
     * 下拉框面板
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs(fieldName + ' dropdown list box')
    /**
     * 单选框
     * @param fieldName 字段名称
     * @param nthCheckbox 第一个选项为0，以此类推
     * @returns 
     */
    checkbox = (fieldName: string, nthCheckbox: number) =>
        PageElement.located(By.id('ctl00_body_rb' + this.entityMap.get(fieldName) + '_' + nthCheckbox))
            .describedAs(`field ${fieldName}: ${nthCheckbox}th checkbox`)

    /**
     * Cost Scoping Base Period的单选框
     * @param nthCheckbox 第一个选项为0，以此类推
     * @returns 
     */
    costScopingBasePeriodCheckbox = (nthCheckbox: number) =>
        PageElement.located(By.id('rbPeriodType' + nthCheckbox))
            .describedAs(`${nthCheckbox}th Cost Scoping Base Period checkbox`)

    availableAttribute = (itemName: string) =>
        PageElement.located(By.cssContainingText('#ctl00_body_ucTemplateField1_lstAttributes option', itemName))
            .describedAs('avalable attribute: ' + itemName)

    availableAttributeAddIcon = () =>
        PageElement.located(By.id('ctl00_body_ucTemplateField1_btnAddClassification'))
            .describedAs('available attribute icon')

    selectedAttributeTable = () =>
        PageElement.located(By.id('ctl00_body_ucTemplateField1_dgSelClassifications'))
            .describedAs('selected attribute table')

    /**
     * selected Attribute表的行
     * @param rowNumber 行号，含表头，第一行为0
     * @returns 
     */
    selectedAttributeTableRow = (rowNumber: number) =>
        PageElements.located(By.css('tr')).nth(rowNumber)
            .of(this.selectedAttributeTable())
            .describedAs(`selected attribute table row: ${rowNumber} `)

    /**
     * selected Attribute表的attribute单元格
     * @param rowNumber 行号，含表头，第一行为0
     * @param fieldName 列名
     * @returns 
     */
    selectedAttributeTableColumn = (rowNumber: number, columnName: string) => {
        const rowCellNumber = rowNumber + 1
        return PageElement.located(By.id('ctl00_body_ucTemplateField1_dgSelClassifications_ctl0' + rowCellNumber + '_' + this.entityMap.get(columnName)))
            .of(this.selectedAttributeTableRow(rowNumber))
            .describedAs(`selected attribute table row ${columnName} column`)
    }

    availableNodeRoot = () =>
        PageElement.located(By.id('ctl00bodyucTemplateField1wtvUnNodes_1'))
            .describedAs('available root node')

    availableNodeRootName = (itemName: string) =>
        PageElement.located(By.cssContainingText('span', itemName))
            .of(this.availableNodeRoot())
            .describedAs('available root node name:' + itemName)

    availableNodeRootCheckbox = () =>
        PageElement.located(By.css('input'))
            .of(this.availableNodeRoot())
            .describedAs('available root node checkbox')

    availableNodeListBox = () =>
        PageElement.located(By.id('M_ctl00bodyucTemplateField1wtvUnNodes_1'))
            .describedAs('available node list box')

    availableNodeList = () =>
        PageElements.located(By.css('div'))
            .of(this.availableNodeListBox())
            .describedAs('available node list box')

    /**
     * selected Available Node的node节点
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @returns 
     */
    availableNode = (nodeNumber: string) =>
        PageElement.located(By.id('ctl00bodyucTemplateField1wtvUnNodes_1_' + nodeNumber))
            .describedAs(`available node: ${nodeNumber}`)

    /**
     * selected Available Node表的node节点名称
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @param nodeName 节点名称
     * @returns 
     */
    availableNodeName = (nodeNumber: string, nodeName: string) =>
        PageElement.located(By.cssContainingText('span', nodeName))
            .of(this.availableNode(nodeNumber))
            .describedAs(`available node: ${nodeNumber} name ${nodeName}`)

    /**
     * selected Available Node表的node节点名称
     * @param nodeNumber 第几个节点， 第一个为1，以此类推
     * @param nodeName 节点名称
     * @returns 
     */
    availableNodeCheckbox = (nodeNumber: string) =>
        PageElement.located(By.css('input'))
            .of(this.availableNode(nodeNumber))
            .describedAs(`available node: ${nodeNumber} checkbox`)

    selectedAvailableNodeTable = () =>
        PageElement.located(By.id('ctl00_body_ucTemplateField1_dgSelectedNodes'))
            .describedAs('selected available node table')
    /**
     * selected Available Node表的行
     * @param rowNumber 包含首行，第一行为0，以此类推
     * @returns 
     */
    selectedAvailableNodeTableRow = (rowNumber: number) =>
        PageElement.located(By.css('tr'))
            .of(this.selectedAvailableNodeTable())
            .describedAs(`selected available node table ${rowNumber} row`)

    /**
     * selected Available Node表的单元格
     * @param rowNumber 包含首行，第一行为0，以此类推
     * @param columnName 列名
     */
    selectedAvailableNodeTableColumn = (rowNumber: number, columnName: string) => {
        const rowCellNumber = rowNumber + 1
        return PageElement.located(By.id('ctl00_body_ucTemplateField1_dgSelectedNodes_ctl0' + rowCellNumber + '_' + this.entityMap.get(columnName)))
            .of(this.selectedAvailableNodeTableRow(rowNumber))
            .describedAs(`selected available node table ${rowNumber} row`)
    }

    scopingTemplateDetailRow = () =>
        PageElement.located(By.css(`[templatelineitemautoid="0"]`))
            .describedAs('scoping template detail row')

    scopingTemplateDetailInputField = () =>
        PageElement.located(By.css(`[customcolumn="1"]`))
            .describedAs('scoping template detail row')

    scopingTempleteDetailLookupPopup = () =>
        PageElement.located(By.css('.modalPopup.cmodal iframe'))
        .describedAs('scoping teplate detail lookup popup')

    accountCodeItem = (itemName: string) =>
        PageElement.located(By.cssContainingText('#ctl00_body_docTreeview_treeview span', itemName))
        .describedAs('Account Code item')

    selectedAccountCodeItem = () =>
        PageElement.located(By.id('ctl00_body_docTreeview_treeview_tv_active'))

    selectedAccountCodeItemCheckbox = () =>
        PageElement.located(By.css('input'))
            .of(this.selectedAccountCodeItem())

    /******************************** preview tab 页面******************************** */
    previewTable = () =>
        PageElement.located(By.css('.cdatagrid'))
            .describedAs('template preview table')

    /**
     * preview表的行，
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns 
     */
    previewTableRow = (rowNumber: number) =>
        PageElements.located(By.css('tr'))
            .nth(rowNumber)
            .of(this.previewTable())
            .describedAs('template preview table row:' + rowNumber)

    /**
     * preview表的单元格，含表头，第一行为0， 以此类推
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 列序号，第一列为0，以此类推
     * @returns 
     */
    previewTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td'))
            .nth(colNumber)
            .of(this.previewTableRow(rowNumber))
            .describedAs(`template preview table row:${rowNumber}, col:${colNumber} cell`)

    /**
     * preview表的自定义attribute列
     * @returns 
     */
    previewTableAttributeCell = () =>
        PageElement.located(By.css('div'))
            .of(this.previewTableCell(0, 1))
            .describedAs('template preview table attribute cell')

    /**
     * preview表的自定义attribute列的必填标记
     * @returns 
     */
    previewTableAttributeCellIsRequiredIcon = () =>
        PageElement.located(By.css('span.star'))
            .of(this.previewTableCell(0, 1))
            .describedAs('template preview table attribute cell')

    /**
     * preview表的Total列
     * @returns 
     */
    previewTableTotalCell = () =>
        PageElements.located(By.css('td'))
            .nth(1)
            .of(PageElements.located(By.css('tfoot tr')).last())
            .describedAs('template preview table Total cell')
}

export const scopingTemplate = new EditScopingTemplateFIelds(scopingTemplateAttributesMap)

