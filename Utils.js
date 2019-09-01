    errorConsole: function(msg) {
        if(msg) console.error('[e621.net Helper Utils Error] ' + msg);
    },
    _notifyConstru(opertor, msg, prefix) {
        if(!opertor) throw new Error('Missing argument operator OwO');
        var prefixMsg = '[e621.net Helper] ';
        if(prefix === null || prefix === false) prefixMsg = '';
        if(window[opertor] && typeof window.notice === 'function') return window[opertor].call(null, prefixMsg + msg);
        return Utils.error('window.notice is not a valid function any more QvQ, WHYYYYYY DEV FROM E621!!!!!!!!!!!!!');
    },
