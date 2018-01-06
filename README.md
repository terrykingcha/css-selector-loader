[![npm][npm]][npm-url]
[![node][node]][node-url]

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>CSS Selector Loader</h1>
  <p>Load CSS selectors and their styles into JS</p>
</div>

<h2 align="center">Install</h2>

```bash
npm install css-selector-loader --save-dev
```

<h2 align="center"><a href="https://webpack.js.org/concepts/loaders">Usage</a></h2>

It's recommended to combine `css-selector-loader` with the [`postcss-loader`](https://github.com/postcss/postcss-loader)

**file.css**
```css
.foo {
    width: 100px;
    height: 100px;
}

.bar {
    width: var(--w)px;
    height: var(--h)px;
}
```

**component.js**
```javascript
import {
    getFoo as getFooStyle
    getBar as getBarStyle
} from './file.css'

fooElement.style.cssText = getFooStyle();
barElement.style.cssText = getBarStyle({
    w: 50,
    h: 50
});

```

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "css-selector-loader" },
          { loader: "postcss-loader" }
        ]
      }
    ]
  }
}
```
<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`root`**|`{String}`|`./`|helps inline local url(...)'s as data-uri's |
|**`camelCase`**|`{Boolean}`|`true`|Enable/disable transfering css selectors into camel-case|
|**`useVarTemplate`** |`{Boolean}`|`true`|Enable/disable use function arguments to replace with css variables|

### `root`

**webpack.config.js**
```js
{
  loader: 'css-selector-loader',
  options: {
    root: path.resolve(__dirname, 'css')
  }
}
```

### `camelCase`

**webpack.config.js**
```js
{
  loader: 'css-selector-loader',
  options: {
    camelCase: false
  }
}
```

### `useVarTemplate`

**webpack.config.js**
```js
{
  loader: 'css-selector-loader',
  options: {
    useVarTemplate: false
  }
}
```

[npm]: https://img.shields.io/npm/v/css-selector-loader.svg
[npm-url]: https://npmjs.com/package/css-selector-loader

[node]: https://img.shields.io/node/v/css-selector-loader.svg
[node-url]: https://nodejs.org