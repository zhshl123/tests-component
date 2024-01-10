import { equals } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { Attribute, By, Click, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { vendorAttributeMap } from './VendorAttributes';

export class EditVendorFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    emailNotificationsCheckBox = () =>
        PageElement.located(By.id('ctl00_body_IsReceiveAdEmail_chkBoolean'))
            .describedAs('chckbox: Would you like to receive e-mail notifications regarding new bidding opportunities?')

    clickEmailNotificationsCheckBox = (isSelected: string) => {
        return isSelected === 'true' ? Task.where(`#actor selects email notification checkbox`,
            Check.whether(Attribute.called('initialvalue').of(this.emailNotificationsCheckBox()), equals('false'))
                .andIfSo(
                    Click.on(this.emailNotificationsCheckBox())
                ).otherwise(
                    Log.the('email notification checkbox is selected')
                )
        ) : Task.where(`#actor does not select email notification checkbox`,
            Check.whether(Attribute.called('initialvalue').of(this.emailNotificationsCheckBox()), equals('true'))
                .andIfSo(
                    Click.on(this.emailNotificationsCheckBox())
                ).otherwise(
                    Log.the('email notification checkbox is not selected')
                )
        )
    }

    countryStateloadingIcon = () =>
        PageElement.located(By.id('ajaxMask'))
            .describedAs('country states loading icon')

}

export const vendor = new EditVendorFields(vendorAttributeMap)