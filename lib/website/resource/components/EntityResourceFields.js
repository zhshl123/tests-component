"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseEntityResource = exports.entityResource = exports.EntityResourceFieldds = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const ResourceAttributes_1 = require("./ResourceAttributes");
class EntityResourceFieldds extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.searchFormTextInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScheduleResources_txt' + this.entityMap.get(fieldName)))
            .describedAs(`contract resource search form text input field: ${fieldName}`);
        this.addResourceIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScheduleResources_imgNew'))
            .describedAs('add contract resource icon');
        this.selectResourcePopup = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucScheduleResources_ucResources_ifmPopup'))
            .describedAs('select contract resource popup');
        this.multiCheckBoxInPopup = (resourceName) => web_1.PageElements.located(web_1.By.css(`[checktext="${resourceName}"]`)).first()
            .describedAs(`multi check box: ${resourceName} in selecr reosurce popup`);
        this.resourceListBox = () => web_1.PageElement.located(web_1.By.id('div_ctl00_body_ucScheduleResources_gvScheduleObjectResources'))
            .describedAs('contract resource list box');
        this.resourceList = () => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
            .of(this.resourceListBox())
            .describedAs('contract resource list ');
        this.emptyResourceList = () => web_1.PageElement.located(web_1.By.css('.cstdgrid__emptyrow'))
            .of(this.resourceListBox())
            .describedAs('empty contract resource list');
        this.firstDeleteIconInList = () => {
            return web_1.PageElement.located(web_1.By.id('ctl00_body_ucScheduleResources_gvScheduleObjectResources_ctl02_btnDelResourceRow'))
                .describedAs(`delete icon in contract resource list`);
        };
        /**
           * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
           * @param fieldName 字段名称
           * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
           * @param popupFieldName 在弹窗中填入关键词的字段名
           * @returns
           */
        this.selectResourceInPopup = (fieldName, itemName) => {
            const searchForm = new abstract_1.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, searchForm.fillTextInputField(fieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(this.multiCheckBoxInPopup(itemName)), common_1.clickButton.using(DefaultStaticParams_1.OK));
        };
    }
}
exports.EntityResourceFieldds = EntityResourceFieldds;
exports.entityResource = new EntityResourceFieldds(ResourceAttributes_1.resourceAttributeMap);
exports.browseEntityResource = new abstract_1.SearchFromFields(ResourceAttributes_1.resourceAttributeMap);
//# sourceMappingURL=EntityResourceFields.js.map