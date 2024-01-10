import { Duration, Log, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web';

import { OK, SEARCH } from '../../../DefaultStaticParams';
import { clickButton } from '../../common';
import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { resourceAttributeMap } from './ResourceAttributes';

export class EntityResourceFieldds extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    searchFormTextInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ucScheduleResources_txt' + this.entityMap.get(fieldName)))
            .describedAs(`contract resource search form text input field: ${fieldName}`)

    addResourceIcon = () =>
        PageElement.located(By.id('ctl00_body_ucScheduleResources_imgNew'))
            .describedAs('add contract resource icon')

    selectResourcePopup = () =>
        PageElement.located(By.id('ctl00_body_ucScheduleResources_ucResources_ifmPopup'))
            .describedAs('select contract resource popup')

    multiCheckBoxInPopup = (resourceName: string) =>
        PageElements.located(By.css(`[checktext="${resourceName}"]`)).first()
            .describedAs(`multi check box: ${resourceName} in selecr reosurce popup`)

    resourceListBox = () =>
        PageElement.located(By.id('div_ctl00_body_ucScheduleResources_gvScheduleObjectResources'))
            .describedAs('contract resource list box')

    resourceList = () =>
        PageElements.located(By.css('.cstdgrid__bodyrow'))
            .of(this.resourceListBox())
            .describedAs('contract resource list ')

    emptyResourceList = () =>
        PageElement.located(By.css('.cstdgrid__emptyrow'))
            .of(this.resourceListBox())
            .describedAs('empty contract resource list')

    firstDeleteIconInList = () => {
        return PageElement.located(By.id('ctl00_body_ucScheduleResources_gvScheduleObjectResources_ctl02_btnDelResourceRow'))
            .describedAs(`delete icon in contract resource list`)
    }

    /**
       * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
       * @param fieldName 字段名称
       * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
       * @param popupFieldName 在弹窗中填入关键词的字段名
       * @returns 
       */
    selectResourceInPopup = (fieldName: string, itemName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return  Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            searchForm.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(this.multiCheckBoxInPopup(itemName)),
            clickButton.using(OK)
        )
    }

}

export const entityResource = new EntityResourceFieldds(resourceAttributeMap)
export const browseEntityResource = new SearchFromFields(resourceAttributeMap)