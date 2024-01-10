"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseTimesheetInfo = exports.BrowseTimesheet = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const abstract_1 = require(".././common/abstract");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const TimesheetAttributes_1 = require("./TimesheetAttributes");
class BrowseTimesheet extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            return core_1.Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(this.fillTextInputField(popupFieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), this.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), 
            // 点击多选框的全选
            (0, common_1.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH));
        };
        this.searchLookupInBrowsePage = (fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, this.selectItemInlookupPopup(fieldName, web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value(), 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, common_1.checkGridList)());
        };
    }
}
exports.BrowseTimesheet = BrowseTimesheet;
exports.browseTimesheetInfo = new BrowseTimesheet(TimesheetAttributes_1.timesheetMap);
//# sourceMappingURL=BrowseTimesheet.js.map