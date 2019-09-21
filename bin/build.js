const fs = require('fs');
const path = require('path');

const isDev = process.argv[3] === '--dev';

const headerParser = require('./HeaderFileGen');

const importedFiles = [];

let flagsHint = {
    'allow-duplicate-imports': {
        hint: true,
    },
};

function ShowHint(flag, justShowIt=false) {
    if(flag && flagsHint[flag]) {
        const hintBlock = flagsHint[flag];
        if(justShowIt === false) {
            // Already show this hint, stop poping it up
            if(hintBlock.show === false) return false;
        }
        let hint = fs.readFileSync(path.resolve(`${__dirname}/./assets/hints/${flag}.txt`), 'utf8');
        if(hint) {
            hint = hint.replace(/\$FLAG/gm, `--${flag}`);
            console.log(`---\n💡 Flags Hint: ${hint}\n---`);
            hintBlock.show = false;
        }
    }
}

const regexs = {
    import: /import\s+\*\s+as\s+(\w\d?)+\s+from\s+('.*'|".*");?/gm,
    importPart: /import\s+{.*}\s+from\s+('.*'|".*");?/gm,
    improtPath: /('|")(.*)('|")/
}

const indexFilePath = path.resolve(`${__dirname}/../src/index.js`);
const indexFileContent = fs.readFileSync(indexFilePath, 'utf8');

const allImportStatement = indexFileContent.match(regexs.import);
    
for(let importFilePath of allImportStatement) {
    importFilePath = importFilePath.match(regexs.improtPath)[2];
    let host = isDev === true ? path.dirname(indexFilePath) : 'raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master/src/';
    importFilePath = path.join(`${host}/${importFilePath}`);
    
    isDev === false ? importFilePath = `https://${importFilePath}` : importFilePath = `file://${importFilePath}`;
    let ext = '';
    if(!importFilePath.endsWith('.js')) ext = '.js'
    importedFiles.push(`// @require      ${importFilePath}${ext}`);
}

let result = headerParser.Build(
    isDev,
    importedFiles.join('\n')
)

if(isDev === true) {
    console.log(result);
    return true;
}

result = result.replace(/@require.*index.user.js/gm, '');

let overwriteFile = result;

overwriteFile += indexFileContent.replace(regexs.import, '');

const userIndexScriptPath = path.join(`${__dirname}/../index.user.js`);

fs.writeFileSync(userIndexScriptPath, overwriteFile);