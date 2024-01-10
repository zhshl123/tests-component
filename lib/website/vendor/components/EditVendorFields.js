"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendor = exports.EditVendorFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const VendorAttributes_1 = require("./VendorAttributes");
class EditVendorFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.emailNotificationsCheckBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_IsReceiveAdEmail_chkBoolean'))
            .describedAs('chckbox: Would you like to receive e-mail notifications regarding new bidding opportunities?');
        this.clickEmailNotificationsCheckBox = (isSelected) => {
            return isSelected === 'true' ? core_1.Task.where(`#actor selects email notification checkbox`, core_1.Check.whether(web_1.Attribute.called('initialvalue').of(this.emailNotificationsCheckBox()), (0, assertions_1.equals)('false'))
                .andIfSo(web_1.Click.on(this.emailNotificationsCheckBox())).otherwise(core_1.Log.the('email notification checkbox is selected'))) : core_1.Task.where(`#actor does not select email notification checkbox`, core_1.Check.whether(web_1.Attribute.called('initialvalue').of(this.emailNotificationsCheckBox()), (0, assertions_1.equals)('true'))
                .andIfSo(web_1.Click.on(this.emailNotificationsCheckBox())).otherwise(core_1.Log.the('email notification checkbox is not selected')));
        };
        this.countryStateloadingIcon = () => web_1.PageElement.located(web_1.By.id('ajaxMask'))
            .describedAs('country states loading icon');
    }
}
exports.EditVendorFields = EditVendorFields;
exports.vendor = new EditVendorFields(VendorAttributes_1.vendorAttributeMap);
//# sourceMappingURL=EditVendorFields.js.map