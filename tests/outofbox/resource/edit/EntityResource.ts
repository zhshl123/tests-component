import { Check, Duration, List, Log, Task, Wait } from '@serenity-js/core'
import { Click, Enter, isVisible, Switch } from '@serenity-js/web'

import { FAILED, OK, SAVE, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams'
import { checkTextInGridList, clickActionButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../../common'
import { browseEntityResource, entityResource } from '../components'

export const addEntityResource = {
    using: (resourceList: string[]) => {
        const items = List.of(resourceList)
        return Task.where(`#actor add contract resource with: ${resourceList}`,
            // 先删除原有的Resource
            deleteOldResource(),
            // 选择目标resource
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Click.on(entityResource.addResourceIcon()),
                Wait.until(entityResource.selectResourcePopup(), isVisible()),
                Switch.to(entityResource.selectResourcePopup()).and(
                    entityResource.selectResourceInPopup('Resource Name', item)
                ),
                Wait.for(Duration.ofSeconds(5)),

            )),
            clickActionButton.using(SAVE), 
            waitMessagePopupBoxVisible(), 
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const deleteOldResource = () => {
    const items = List.of(entityResource.resourceList())
    return Task.where(`#actor delete old contract resource`,
        Check.whether(
            entityResource.emptyResourceList(), isVisible()
        ).andIfSo(
            Log.the('resource list is empty')
        ).otherwise(
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Click.on(entityResource.firstDeleteIconInList()),
                clickMessagePopupButton.using(OK)
            ))
        )
    )
}

export const checkEntityResource = {
    using: (resourceList: string[]) => {
        const items = List.of(resourceList)
        return Task.where(`#actor checeks contract resource with: ${resourceList}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                browseEntityResource.checkSearchResult(item, SUCCEEDED)
            ))
        )
    }
}

export const deleteEntityResource = {
    using: (resourceList: string[]) => {
        const items = List.of(resourceList)
        return Task.where(`#actor deletes contract resource with: ${resourceList}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Enter.theValue(item).into(entityResource.searchFormTextInputField('Resource Name')),
                clickActionButton.using(SEARCH),
                Wait.for(Duration.ofSeconds(5)),
                checkTextInGridList.using(item),
                Click.on(entityResource.firstDeleteIconInList()),
                clickMessagePopupButton.using(OK)
            ))
        )
    }
}

export const checkDeletedEntityResource = {
    using: (resourceList: string[]) => {
        const items = List.of(resourceList)
        return Task.where(`#actor checeks deleted contract resource with: ${resourceList}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                browseEntityResource.checkSearchResult(item, FAILED)
            ))
        )
    }
}