# Development Guide

<img src="https://i.imgur.com/hwwBIHt.gif" />

:heart: Thank you for ur help UwU

---

## Import External Scrpits

### Locals

File splitting is a good thing, it help making the code base clean 🛁

We are using ESM like import system

⚠️NOT the official one, ever import MUST starts with `import * from as <any> from "<path>"`

Example:
```javascript
// ./formatName.js
function formatName(name) {
    // ...
}
```

```javascript
// index.js
import * as formatName from './formatName';
(() => {
    const name = 'Lucario'
    const formattedName = formatName(name);
})()
```

Remote Library

You can add/remove remote library via their public URL

Navigate to the `package.json` file, you should see a field named `621_external_libraries`

Add URL as part of the  `621_external_libraries` sub element

---


## Build For Development

1) Run `$ npm run build:dev`

2) Copy the header meta tags

3) Oen the Tampermonkey dashboard and click the "Plus" sign

<img src="https://i.imgur.com/qbjTgmA.png" />

4) And once the web editor opens up, past your code inside the editor and press <kbd>CTRL</kbd> + <kbd>S</kbd> on Windows, <kbd>⌘ </kbd> + <kbd>S</kbd> on Mac

<img src="https://i.imgur.com/5Bf9Sbx.png" />

---

## Build For Production

1) Run `$ npm run build`

2) 🕐🎩 Wait for Node to perform the magic

3) ✅ Commit the latest bundle file (index.user.js)

---

# Environment Variables

Variable that will going to replace wtih something more dynamic

| ID        | Name                    | Description                                                  | Example                                                                        |   |
|-----------|-------------------------|--------------------------------------------------------------|--------------------------------------------------------------------------------|---|
| $VERSION  | App Version             | The current version of the app                               | 1.0.0                                                                          |   |
| $CWD      | Current Work Path       | The path that you had clone the repo                         | /Users/user/Desktop/e621_helper_tampermonkey                                   |   |
| $REGISTRY | The URL of the registry | The URL that Tampermonkey are going to pull remote code from | https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master |   |
| $LIBS     | Remote Libraries        | All the external remote libraries URLs                       | [https: //code.jquery.com/jquery-3.4.1.min.js]                                 |   |