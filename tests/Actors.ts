import { Actor, Cast } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright, PlaywrightOptions } from '@serenity-js/playwright';
import { CallAnApi} from '@serenity-js/rest';
import * as playwright from 'playwright';
import { ensure, isNotBlank } from 'tiny-types';

export class Actors implements Cast {

    constructor(
        private readonly browser: playwright.Browser,
        private readonly options: PlaywrightOptions,
        private readonly baseApiUrl: string
    ) {
        ensure('apiUrl', baseApiUrl, isNotBlank()); 
    }

    prepare(actor: Actor): Actor {
        return actor.whoCan(
            BrowseTheWebWithPlaywright.using(this.browser, this.options)
        ).whoCan( CallAnApi.at(this.baseApiUrl),);
    }

}
