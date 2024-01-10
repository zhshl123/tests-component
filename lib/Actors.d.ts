import { Actor, Cast } from '@serenity-js/core';
import { PlaywrightOptions } from '@serenity-js/playwright';
import * as playwright from 'playwright';
export declare class Actors implements Cast {
    private readonly browser;
    private readonly options;
    private readonly baseApiUrl;
    constructor(browser: playwright.Browser, options: PlaywrightOptions, baseApiUrl: string);
    prepare(actor: Actor): Actor;
}
