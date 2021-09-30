let windowId = null


chrome.browserAction.onClicked.addListener(function (tab) {
    if (windowId == null) {
        chrome.windows.create({
            url: chrome.runtime.getURL("index.html"),
            type: "popup"
        }, (wind) => {
            windowId = wind.id
        });
    }
    else {
        chrome.windows.get(windowId, {}, (wind) => {
            chrome.windows.update(wind.id, {
                focused: true
            })
        })
    }

});

chrome.windows.onRemoved.addListener(a => {
    a === windowId && (windowId = null)
})



let xframehide = () => {
    chrome.webRequest.onHeadersReceived.addListener((info) => {
        var headers = info.responseHeaders;
        for (var i = headers.length - 1; i >= 0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options' || header == 'x-frame-options') {
                headers.splice(i, 1); // Remove header
            }
        }
        return { responseHeaders: headers };
    }, {
        urls: [
            '*://*/*', // Pattern to match all http(s) pages
            // '*://*.example.org/*', // Pattern to match one http(s) site
        ],
        types: ['sub_frame']
    }, [
        'blocking',
        'responseHeaders',
        // Modern Chrome needs 'extraHeaders' to see and change this header,
        // so the following code evaluates to 'extraHeaders' only in modern Chrome.
        chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS
    ]
    );
}
