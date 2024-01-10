
import { Task } from "@serenity-js/core"
import { By, Enter, PageElement } from "@serenity-js/web"
import { checkGridList, clickButton } from "../common"
import { SEARCH } from "../../DefaultStaticParams"

export const searchCOR = {
    using: (Subject:any)=>
        Task.where('#actor search cor with:${Subject}',
            Enter.theValue(Subject).into(BrowseCOR.SubjectInputField()),clickButton.using(SEARCH),checkGridList())
}




export class BrowseCOR { 
    static SubjectInputField = () =>
        PageElement.located(By.id('ct100_body_SubjectDesc_txtText')).describedAs('Subject Input Field')
}