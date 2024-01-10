"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipMessageList = exports.tipMessage = exports.checkTipMessage = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 检查字段底部校验提示信息是否存在
 * @param tipWords 提示信息的内容
 */
exports.checkTipMessage = {
    using: (tipWords) => {
        // 没有指定具体提示信息，直接提示信息集合中首个元素
        // eslint-disable-next-line unicorn/prefer-ternary
        if (tipWords == '') {
            return core_1.Task.where(`#actor check tip message`, assertions_1.Ensure.eventually((0, exports.tipMessageList)(), (0, assertions_1.isPresent)()));
        }
        else {
            // 指定的提示信息
            return core_1.Task.where(`#actor check tip message with ${tipWords}`, assertions_1.Ensure.eventually((0, exports.tipMessage)(tipWords), (0, web_1.isVisible)()));
        }
    }
};
// 具体的某提示信息组件
const tipMessage = (tipWords) => web_1.PageElement.located(web_1.By.cssContainingText('span', tipWords));
exports.tipMessage = tipMessage;
// 提示信息组件集合
const tipMessageList = () => web_1.PageElements.located(web_1.By.css('.tip-message'));
exports.tipMessageList = tipMessageList;
//# sourceMappingURL=CheckTipMessage.js.map