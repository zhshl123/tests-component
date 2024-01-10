
import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Question, Task } from '@serenity-js/core';
import { Text } from '@serenity-js/web';
import { By, PageElement } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';
import { gridTextTdList } from '../../common';
import { SearchFromFields } from '../../common/abstract';
import { solicitationAttributesMap } from '../components/SolicitationAttributes';

export class BrowseSolicitationFields extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
    /**
     * 
     * @param itemName 校验的item值
     * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
     * @returns 
     */
    checkSearchResult = (itemName: string | Question<any>, expectedResult: string | Question<any>) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check search item: ${itemName} exists`,
            Ensure.eventually(gridTextTdList(itemName), isPresent())
        ) : Task.where(`#actor check search item: ${itemName} not exists`,
            Ensure.eventually(this.emptyGrid(), isPresent())
        );
    }

    /**
     * 校验单元格的值
     * @param fieldName 字段名
     * @param itemName 要检验的值
     * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
     * @returns 
     */
    checkGridResult = (fieldName: string | Question<any>, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check line item ${fieldName}'s cell value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.gridTextTdList(fieldName)), equals(itemName))
        ) : Task.where(`#actor check line item ${fieldName}'s cell value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.gridTextTdList(fieldName)), not(equals(itemName)))
        )
    }
    /**
 * grid List 列表
 * @returns 
 */
    gridList = () =>
        PageElement.located(By.css('.cstdgrid__bodyrow'))
            .describedAs('grid list')

    /**
* 获取含有关键词的单元格
* @param content 单元格内容
* @returns 
*/
    gridTextTdList = (content: string | Question<any>) =>
        PageElement.located(By.cssContainingText('td', content))
            .describedAs('Grid Text Table data List with content:' + content)

    /**
* 获取带链接的单元格
* @param content 单元格内容
* @returns 
*/
    gridLinkTdList = (content: string | Question<any>) =>
        PageElement.located(By.cssContainingText('a', content))
            .describedAs('Grid Link Table data List with content:' + content)

    /**
* 列表没有数据
*
*/
    emptyGrid = () =>
        PageElement.located(By.css('.cstdgrid__emptyrow'))
            .describedAs('empty grid')
}

export const browseSolicitation = new BrowseSolicitationFields(solicitationAttributesMap)