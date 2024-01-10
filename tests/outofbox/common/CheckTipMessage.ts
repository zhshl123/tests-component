import {Ensure,isPresent} from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, isVisible,PageElement, PageElements } from '@serenity-js/web';

/**
 * 检查字段底部校验提示信息是否存在
 * @param tipWords 提示信息的内容
 */
export const checkTipMessage = {
    using:(tipWords?:string) =>{
        // 没有指定具体提示信息，直接提示信息集合中首个元素
        // eslint-disable-next-line unicorn/prefer-ternary
        if(tipWords == ''){
            return Task.where(`#actor check tip message`,
                Ensure.eventually(tipMessageList(), isPresent())
            );
        }else{
            // 指定的提示信息
            return Task.where(`#actor check tip message with ${tipWords}`,
                Ensure.eventually(tipMessage(tipWords), isVisible())
            );
        }
    }
    
}

// 具体的某提示信息组件
export const tipMessage = (tipWords :string) =>
    PageElement.located(By.cssContainingText('span',tipWords))

// 提示信息组件集合
export const tipMessageList = () =>
    PageElements.located(By.css('.tip-message'))