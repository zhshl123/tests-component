import { DataTable } from '@cucumber/cucumber';
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { SAVE } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_CONTRACT_NAME } from '../common/statics';
import { ADD_CONTRACT } from '../common/statics/StaticPageName';
import { contract } from './components/EditContractFields';

/**
 * 添加contract
 */
export const addContractWithRequiredFields = {

    using: (contractInfo: DataTable) => {
        contract.contractType = contractInfo.rowsHash().ContractType
        return Task.where(`#actor submit add contract information`,
            openPage.using(ADD_CONTRACT),
            // 添加等待时间，以确保页面加载完成
            Wait.for(Duration.ofSeconds(2)),
            // 填入必填字段
            fillContractRequiredFields.using(contractInfo.rowsHash().ContractType,
                contractInfo.rowsHash().ContractName,
                contractInfo.rowsHash().PrimeContractor,
                contractInfo.rowsHash().ParentContract),
            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillContractRequiredFields = {
    using: (contractType: string, contractName: string, primeContractor: string, parentContract: string) => {
        // eslint-disable-next-line prefer-const
        let timestamp = formatted_now
        return Task.where(`#actor fill contract with required fields`,
            // 选完Contract Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            contract.selectDropdownItem('Contract Type', contractType),
            Wait.for(Duration.ofSeconds(5)),

            contract.fillTextInputField('Contract Name', contractName + timestamp),
            contract.setCookie(COOKIE_CONTRACT_NAME, contractName + timestamp),
            contract.fillTextInputField('Contract Number', contractName + timestamp),

            // 选完Prime Contractor，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            contract.selectItemInlookupPopup('Prime Contractor', primeContractor, 'Vendor ID'),
            Wait.for(Duration.ofSeconds(5)),
            Check.whether(
                contract.lookupInputField('Parent Contract'), isVisible()
            ).andIfSo(
                contract.selectItemInlookupPopup('Parent Contract', parentContract, 'Contract Name'),
            )

        )
    }

}

export const fillContractNotRequiredFields = {
    using: (contractInfo: DataTable) => {

        return Task.where(`#actor fill contract with not required fields`,

            contract.fillDateInputField('Award Date', contractInfo.rowsHash().AwardDate),
            contract.fillDateInputField('Signed Date', contractInfo.rowsHash().SignedDate),
            contract.fillTextInputField('Contact Person', contractInfo.rowsHash().ContactPerson),
            contract.fillTextInputField('Description', contractInfo.rowsHash().Description),
            contract.fillNumberInputField('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal),
            contract.fillNumberInputField('Retainage Rate', contractInfo.rowsHash().RetainageRate),

            //动态出现的日历
            Check.whether(contract.dateInputField('NTP Date'), isVisible())
                .andIfSo(
                    contract.fillDateInputField('NTP Date', contractInfo.rowsHash().NTPDate),
                    contract.fillDateInputField('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate),
                    contract.fillDateInputField('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate),

                ),
            // Contract Timeline
            contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate),
            contract.fillNumberInputField('Duration', contractInfo.rowsHash().Duration),
        )
    }
}

