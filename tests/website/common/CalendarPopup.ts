import { Ensure, isPresent } from '@serenity-js/assertions'
import { Task } from '@serenity-js/core'
import { By, Click, Key, PageElement, PageElements, Press } from '@serenity-js/web'
import exp = require('constants')

/**
 * 检查Calendar弹出框
 * @returns 
 */
export const checkCalendarBox = () =>
    Task.where(`#actor check calendar box`,
        Ensure.eventually(calendarBoxs(), isPresent())
    )

/**
 * 点击日历的当天时间
 * @returns 
 */
export const clickCalendarToday = (calendarNth = 0) =>
    Task.where(`#actor click calendar date today`,
        Click.on(dateToday(calendarNth))
    )

/**
 * 点击日历的月份
 * @returns 
 */
export const clickCalendarMonth = (calendarNth: number, date: string) => {
    const month = date.split('/')[1]
    return Task.where(`#actor click calendar month`,

        Click.on(calendarMonth(calendarNth, month))
    )
}

/**
 * 点击日历的年份
 * @returns 
 */
export const clickCalendarYear = (calendarNth: number, date: string) => {
    const year = date.split('/')[0]
    return Task.where(`#actor click calendar year`,

        Click.on(calendarTopMiddleButton(calendarNth)),
        Click.on(calendarTopMiddleButton(calendarNth)),
        Click.on(calendarYear(calendarNth, year))
    )
}

/**
 * 点击日历的日期
 * @param calendarNth 日历从上往下数的序号 第一个为0， 以此类推
 * @param date 日期 eg: 2023/07/22
 * @returns 
 */
export const clickCalendarDate = (calendarNth: number, date: string) => {
    const montNumber = Number(date.split('/')[1]) - 1
    const dateNew = date.split('/')[0] + '/' + montNumber + '/' + date.split('/')[2].replace(/^0+/, '')
    // calendarNth = calendarNth-1
    return Task.where(`#actor click calendar date`,
        clickCalendarYear(calendarNth, date),
        clickCalendarMonth(calendarNth, date),
        Click.on(calendarDate(calendarNth, dateNew))
    )

}

/**
 * 要输入的日期
 * @param date 日期 eg: 07/22/2023
 * @returns 
 */
export const fillSpecialDate = (date: string) => {
    const array = date.split('')

    return Task.where(`#actor click calendar date`,
        Press.the(array[0], array[1], Key.ArrowRight,
            array[3], array[9], Key.ArrowRight,
            array[6], array[7], array[8], array[9],
        )
    )

}

export const calendarBoxs = () =>
    PageElements.located(By.css('.k-widget.k-calendar'))
        .describedAs('Contreact Time Line calendar boxs')

export const dateToday = (calendarNth: number) =>
    PageElement.located(By.css('.k-nav-today'))
        .of(calendarBoxs().nth(calendarNth))
        .describedAs('Contreact Time Line today')

export const calendarTopMiddleButton = (calendarNth: number) =>
    PageElement.located(By.css(`[data-action="nav-up"]`))
        .of(calendarBoxs().nth(calendarNth))
        .describedAs('Calendar Top Middle Button')

/**
 * 月份的集合
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns 
 */
export const calendarMonthList = (calendarNth: number) =>
    PageElements.located(By.css(`[role="gridcell"]`))
        .of(calendarBoxs().nth(calendarNth))
        .describedAs('Calendar grid list')

/**
 * 
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns 
 */
export const calendarMonth = (calendarNth: number, month: string) =>
    calendarMonthList(calendarNth)
        .nth(Number(month) - 1)
        .describedAs('Calendar month ' + month)

/**
 * 日历的年份
 * @param calendarNth 日立的序号
 * @param year 年份 eg: 2023
 * @returns 
 */
export const calendarYear = (calendarNth: number, year: string) =>
    PageElement.located(By.css(`[data-value="${year}/0/1"]`))
        .of(calendarBoxs().nth(calendarNth))
        .describedAs('calendar year ' + year)

/**
 * 
 * @param calendarNth 日历的序号
 * @param date 日期：yyyy/mm/dd eg:2023/06/23
 * @returns 
 */
export const calendarDate = (calendarNth: number, date: string) => {
    const day = date.split('/')[2]
    return PageElement.located(By.cssContainingText(`[data-value="${date}"]`, day))
        .of(calendarBoxs().nth(calendarNth))
        .describedAs('Calendar date ' + date)

}
