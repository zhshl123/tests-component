import { Ensure, isPresent } from '@serenity-js/assertions'
import { Question, Task } from '@serenity-js/core';
import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * check grid List exist Or not
 * @returns 
 */
export const checkGridList = () =>
    Task.where(`#actor check contracts list`,
        Ensure.eventually(gridList(), isPresent())
    )

export const checkTextInGridList = {
    using: (textContent: string | Question<any>) =>
        Task.where(`#actor check text table data in grid list with: ${textContent}`,
            Ensure.eventually(gridList(), isPresent())
        )
}

export const checkLinkInGridList = {
    using: (linkWords: string | Question<any>) =>
        Task.where(`#actor check link table data in grid list with: ${linkWords}`,
            Ensure.eventually(gridList(), isPresent())
        )
}

/**
 * grid List 列表
 * @returns 
 */
export const gridList = () =>
    PageElements.located(By.css('.cstdgrid__bodyrow'))
        .describedAs('grid list')

/**
 * 获取含有关键词的单元格
 * @param content 单元格内容
 * @returns 
 */
export const gridTextTdList = (content: string | Question<any>) =>
    PageElements.located(By.cssContainingText('td', content))
        .describedAs('Grid Text Table data List with content:' + content)

/**
 * 获取带链接的单元格
 * @param content 单元格内容
 * @returns 
 */
export const gridLinkTdList = (content: string | Question<any>) =>
    PageElements.located(By.cssContainingText('a', content))
        .describedAs('Grid Link Table data List with content:' + content)

/**
 * 列表没有数据
 *
 */
export const emptyGrid = () =>
    PageElement.located(By.css('.cstdgrid__emptyrow'))
        .describedAs('empty grid')
        