const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

const isDev = process.argv[3] === '--dev';

const pkgJSON = require('../package.json');

const envs = {
    '$VERSION': pkgJSON.version || '1.0.0',
    '$CWD': cwd || null,
    '$REGISTRY': pkgJSON['621_registry'] || 'https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master',
    '$LIBS': pkgJSON['621_external_libraries'] || null
};

if(!isDev) {
    // Production mode
    envs['$CWD'] = envs['$REGISTRY'];
}

function escapeRegExp(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

if(envs['$LIBS'] !== null) {
    let libStr = '';
    envs['$LIBS'].forEach((libUrl, i) => libStr += `// @require      ${libUrl}${i === envs['$LIBS'].length - 1 ? '' : '\n'}` );
    envs['$LIBS'] = libStr;
}

const headerFileRaw = fs.readFileSync(path.resolve(`${__dirname}/assets/header.txt`), 'utf8');

let headerFileModify = headerFileRaw;
for(let key in envs) {
    const regex = new RegExp( escapeRegExp(key) , 'gm');
    let value = envs[key];
    headerFileModify = headerFileModify.replace(regex, value);
}

// Fix all $CWD path issues

const allWindowsStylePath = headerFileModify.match(
    new RegExp(
        envs['$CWD'] + '(.*)',
        'gm'
    )
);

allWindowsStylePath.forEach(pathStr => {
    const pathStrFixes = pathStr.replace(/\\/g, '/');
    headerFileModify = headerFileModify.replace(pathStr, pathStrFixes);
});

console.log(headerFileModify)