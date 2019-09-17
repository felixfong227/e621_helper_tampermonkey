# Development Guide

<img src="https://i.imgur.com/hwwBIHt.gif" />

:heart: Thank you for ur help UwU

## Build For Development

1) Run `$ npm run build:dev`

2) Copy the header meta tags

3) Oen the Tampermonkey dashboard and click the "Plus" sign

<img src="https://i.imgur.com/qbjTgmA.png" />

4) And once the web editor opens up, past your code inside the editor and press <kbd>CTRL</kbd> + <kbd>S</kbd> on Windows, <kbd>⌘ </kbd> + <kbd>S</kbd> on Mac

<img src="https://i.imgur.com/5Bf9Sbx.png" />

## Build For Production

1) Run `$ npm run build`
2) 🕐🎩
3) After Node perform those fancy magic, commit the bundle JS file(index.user.js)
4) ✅

# Environment Variables

Variable that will going to replace with something more dynamic

| ID        | Name                    | Description                                                  | Example                                                                        |   |
|-----------|-------------------------|--------------------------------------------------------------|--------------------------------------------------------------------------------|---|
| $VERSION  | App Version             | The current version of the app                               | 1.0.0                                                                          |   |
| $CWD      | Current Work Path       | The path that you had clone the repo                         | /Users/user/Desktop/e621_helper_tampermonkey                                   |   |
| $REGISTRY | The URL of the registry | The URL that Tampermonkey are going to pull remote code from | https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master |   |
| $LIBS     | Remote Libraries        | All the external remote libraries URLs                       | [https: //code.jquery.com/jquery-3.4.1.min.js]                                 |   |