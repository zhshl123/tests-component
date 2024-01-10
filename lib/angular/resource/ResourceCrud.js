"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceCrud = exports.ResourceCrud = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../../website/common");
const common_2 = require("../common");
const PopupWindow_1 = require("../common/PopupWindow");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const AddResourceFields_1 = require("./components/AddResourceFields");
class ResourceCrud {
    constructor() {
        this.addByRequiredFields = (resourceInfo) => {
            return core_1.Task.where(`#actor add Resource`, this.fillResourceRequiredField(resourceInfo), web_1.Click.on(common_2.targetButton.getButton(DefaultStaticParams_1.SAVE)), (0, PopupWindow_1.checkAndClosePopupWindow)());
        };
        this.fillResourceRequiredField = (resourceInfo) => {
            const timestamp = common_1.formatted_now;
            return core_1.Task.where(`#actor fill Inspection Report required field`, AddResourceFields_1.resourceAdd.fillTextInputField('Resource ID', resourceInfo.rowsHash().ResourceID + timestamp), AddResourceFields_1.resourceAdd.setCookie(StaticCookie_1.COOKIE_RESOURCE_ID, resourceInfo.rowsHash().ResourceID + timestamp), AddResourceFields_1.resourceAdd.fillResourceTextInputField('Resource Name', 1, resourceInfo.rowsHash().ResourceName), AddResourceFields_1.resourceAdd.selectDropdownItem('Resource Type', resourceInfo.rowsHash().ResourceTypeID), core_1.Wait.for(core_1.Duration.ofSeconds(2)), AddResourceFields_1.resourceAdd.clickRadioButton('Status', resourceInfo.rowsHash().IsActive));
        };
        this.checkRequiredFields = (resourceInfo) => {
            return core_1.Task.where(`#actor check resource information`, AddResourceFields_1.resourceEdit.checkTextInputFieldValue('Resource ID', web_1.Cookie.called(StaticCookie_1.COOKIE_RESOURCE_ID).value(), DefaultStaticParams_1.SUCCEEDED), AddResourceFields_1.resourceEdit.checkTextInputFieldValue('Resource Name', resourceInfo.rowsHash().ResourceName, DefaultStaticParams_1.SUCCEEDED), AddResourceFields_1.resourceEdit.checkDropdownFieldValue('Resource Type', resourceInfo.rowsHash().ResourceTypeID, DefaultStaticParams_1.SUCCEEDED), AddResourceFields_1.resourceEdit.checkSelectedRadioButton('Status', resourceInfo.rowsHash().IsActive, DefaultStaticParams_1.SUCCEEDED));
        };
        this.delete = () => core_1.Task.where(`#actor delete resource`, common_2.clickButton.using(DefaultStaticParams_1.DELETE), assertions_1.Ensure.eventually((0, PopupWindow_1.iconInAlertMessageBox)(), (0, web_1.isVisible)()), web_1.Click.on((0, PopupWindow_1.buttonInAlertMessageBox)(DefaultStaticParams_1.OK)), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
}
exports.ResourceCrud = ResourceCrud;
exports.resourceCrud = new ResourceCrud();
//# sourceMappingURL=ResourceCrud.js.map