# @wordway/translate-api

[![npm version][npm-image]][npm-url]
[![npm][npm-dm-image]][npm-dm-url]
[![Join the chat][telegram-image]][telegram-url]

[npm-image]: https://img.shields.io/npm/v/@wordway/translate-api.svg
[npm-url]: https://www.npmjs.com/package/@wordway/translate-api
[npm-dm-image]: https://img.shields.io/npm/dm/@wordway/translate-api.svg
[npm-dm-url]: https://www.npmjs.com/package/@wordway/translate-api
[telegram-image]:https://img.shields.io/badge/chat-on%20telegram-blue.svg
[telegram-url]: https://t.me/wordway

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quick Start](#quick-start)
  - [Installation](#installation)
- [Local Development](#local-development)
  - [`npm start` or `yarn start`](#npm-start-or-yarn-start)
  - [`npm run build` or `yarn build`](#npm-run-build-or-yarn-build)
  - [`npm test` or `yarn test`](#npm-test-or-yarn-test)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start

### Installation

```bash
$ yarn add @wordway/translate-api
```

Now, enjoy!

```js
const icibaEngine = new IcibaEngine({
  key: '<Your key>',
});
const youdaoEngine = new YoudaoEngine({
  appKey: '<Your appKey>',
  appSecret: '<Your appSecret>',
});

const client = new Translate([icibaEngine, youdaoEngine]);

const lookUpResult = await client.engine('youdao').lookUp('hello');
```

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

## License

```
MIT License

Copyright (c) 2019 LiJianying <lijy91@foxmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
