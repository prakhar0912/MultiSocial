self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetchWithParamAddedToRequestBody(event.request)
    );
});
function fetchWithParamAddedToRequestBody(request) {
    serialize(request).then(function (serialized) {
        // modify serialized.body here to add your request parameter
        deserialize(serialized).then(function (request) {
            return fetch(request);
        });
    }); // fixed this
}
function serialize(request) {
    var headers = {};
    for (var entry of request.headers.entries()) {
        console.log(entry)
        headers[entry[0]] = entry[1];
    }
    var serialized = {
        url: request.url,
        headers: headers,
        method: request.method,
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        return request.clone().text().then(function (body) {
            serialized.body = body;
            return Promise.resolve(serialized);
        });
    }
    return Promise.resolve(serialized);
}
function deserialize(data) {
    return Promise.resolve(new Request(data.url, data));
}