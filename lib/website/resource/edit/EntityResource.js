"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDeletedEntityResource = exports.deleteEntityResource = exports.checkEntityResource = exports.deleteOldResource = exports.addEntityResource = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
exports.addEntityResource = {
    using: (resourceList) => {
        const items = core_1.List.of(resourceList);
        return core_1.Task.where(`#actor add contract resource with: ${resourceList}`, 
        // 先删除原有的Resource
        (0, exports.deleteOldResource)(), 
        // 选择目标resource
        items.forEach(({ actor, item }) => actor.attemptsTo(web_1.Click.on(components_1.entityResource.addResourceIcon()), core_1.Wait.until(components_1.entityResource.selectResourcePopup(), (0, web_1.isVisible)()), web_1.Switch.to(components_1.entityResource.selectResourcePopup()).and(components_1.entityResource.selectResourceInPopup('Resource Name', item)), core_1.Wait.for(core_1.Duration.ofSeconds(5)))), common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
const deleteOldResource = () => {
    const items = core_1.List.of(components_1.entityResource.resourceList());
    return core_1.Task.where(`#actor delete old contract resource`, core_1.Check.whether(components_1.entityResource.emptyResourceList(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the('resource list is empty')).otherwise(items.forEach(({ actor, item }) => actor.attemptsTo(web_1.Click.on(components_1.entityResource.firstDeleteIconInList()), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)))));
};
exports.deleteOldResource = deleteOldResource;
exports.checkEntityResource = {
    using: (resourceList) => {
        const items = core_1.List.of(resourceList);
        return core_1.Task.where(`#actor checeks contract resource with: ${resourceList}`, items.forEach(({ actor, item }) => actor.attemptsTo(components_1.browseEntityResource.checkSearchResult(item, DefaultStaticParams_1.SUCCEEDED))));
    }
};
exports.deleteEntityResource = {
    using: (resourceList) => {
        const items = core_1.List.of(resourceList);
        return core_1.Task.where(`#actor deletes contract resource with: ${resourceList}`, items.forEach(({ actor, item }) => actor.attemptsTo(web_1.Enter.theValue(item).into(components_1.entityResource.searchFormTextInputField('Resource Name')), common_1.clickActionButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.checkTextInGridList.using(item), web_1.Click.on(components_1.entityResource.firstDeleteIconInList()), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK))));
    }
};
exports.checkDeletedEntityResource = {
    using: (resourceList) => {
        const items = core_1.List.of(resourceList);
        return core_1.Task.where(`#actor checeks deleted contract resource with: ${resourceList}`, items.forEach(({ actor, item }) => actor.attemptsTo(components_1.browseEntityResource.checkSearchResult(item, DefaultStaticParams_1.FAILED))));
    }
};
//# sourceMappingURL=EntityResource.js.map