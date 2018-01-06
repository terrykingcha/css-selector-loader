const loaderUtils = require('loader-utils');
const jsonify = require('jsonify-css');

module.exports = function (source) {
    this.cacheable && this.cacheable();

    const callback = this.async();
    const value = source.toString();
    const {
        root = './',
        camelCase = true,
        useVarTemplate = true
    } = loaderUtils.getOptions(this) || {};

    const json = jsonify({
        root
    })(value);

    const selectors = {};
    const classSelectorItems = {};
    const templates = [];

    for (let i = 0; i < json.rule.length; i++) {
        const rule = json.rule[i];
        for (const selector in rule) {
            const styles = rule[selector];
            let cssText = [];
            for (let prop in styles) {
                const value = styles[prop];
                prop = prop.replace(/[A-Z]/g, m0 => `-${m0.toLowerCase()}`);
                cssText.push(`${prop}:${value}`);
            }
            cssText = cssText.join(';');
            selectors[selector] = cssText;

            let itemName = selector.match(/^\.([^.\s]+)$/);
            if (itemName) {
                if (camelCase) {
                    itemName = itemName[1].replace(/\-[a-z]/g, m0 => m0.substr(1).toUpperCase());
                }

                classSelectorItems[itemName] = cssText;

                if (useVarTemplate) {
                    const fnName = itemName.replace(/^[a-z]/, m0 => `get${m0.toUpperCase()}`);
                    const template = cssText.replace(/var\(--[^()-]+\)/g, m =>
                        m.replace(/var\(--([^()-]+)\)/, (m0, m1) => `' + data.${m1} + '`)
                    );
                    templates.push(`${fnName}: function (data) {data = data || {}; return '${template}';}`);
                }
            }
        }
    }

    callback(null, `
        module.exports = {
            selectors: ${JSON.stringify(selectors)},
            classSelectorItems: ${JSON.stringify(classSelectorItems)},
            ${templates.join(',')}
        }
    `);
};