import xml from 'xml';
import moment from 'moment';
import path from 'path';

import * as utils from './utils';

const XMLNS_DECLS = {
    _attr: {
        xmlns: `http://www.sitemaps.org/schemas/sitemap/0.9`,
    },
};

export default class SiteMapIndexGenerator {
    ISO8601_FORMAT = `YYYY-MM-DDTHH:mm:ssZ`;
    constructor(options) {
        options = options || {};
        this.types = options.types;
    }

    getXml(options) {
        const urlElements = this.generateSiteMapUrlElements(options);
        const data = {
            // Concat the elements to the _attr declaration
            sitemapindex: [XMLNS_DECLS].concat(urlElements),
        };

        // Return the xml
        return utils.sitemapsUtils.getDeclarations(options) + xml(data);
    }

    generateSiteMapUrlElements({
        sources = [],
        siteUrl,
        pathPrefix,
        resourcesOutput,
    }) {
        return sources.map((source) => {
            const filePath = resourcesOutput
                .replace(/:resource/, source.name)
                .replace(/^\//, ``);
            const siteMapUrl = source.url
                ? source.url
                : new URL(path.join(pathPrefix, filePath), siteUrl).toString();
            const lastModified = source.url
                ? moment(new Date(), this.ISO8601_FORMAT).toISOString()
                : this.types[source.sitemap].lastModified ||
                  moment(new Date(), this.ISO8601_FORMAT).toISOString();

            return {
                sitemap: [
                    { loc: siteMapUrl },
                    { lastmod: moment(lastModified).toISOString() },
                ],
            };
        });
    }
}
