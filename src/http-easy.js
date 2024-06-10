const axios = require('axios');

class HttpEasy {
    constructor(config = {}) {
        this.instance = axios.create(config);
        this.errorHandlers = [];
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        this.instance.interceptors.response.use(
            response => response,
            error => {
                this.errorHandlers.forEach(handler => handler(error));
                return Promise.reject(error);
            }
        );
    }

    onError(handler) {
        this.errorHandlers.push(handler);
    }

    // Generic method for making HTTP requests
    request(method, url, data = null, config = {}) {
        return this.instance.request({
            method,
            url,
            data,
            ...config
        }).then(response => response.data)
        .catch(error => {
            throw new Error(`${method.toUpperCase()} request failed: ${this.formatErrorMessage(error)}`);
        });
    }

    // GET request with query parameters
    get(url, params = {}, config = {}) {
        const fullUrl = this.addQueryParameters(url, params);
        return this.request('GET', fullUrl, null, config);
    }

    // POST request with request body
    post(url, data, config = {}) {
        return this.request('POST', url, data, config);
    }

    // PUT request with request body
    put(url, data, config = {}) {
        return this.request('PUT', url, data, config);
    }

    // PATCH request with request body
    patch(url, data, config = {}) {
        return this.request('PATCH', url, data, config);
    }

    // DELETE request with query parameters
    delete(url, params = {}, config = {}) {
        const fullUrl = this.addQueryParameters(url, params);
        return this.request('DELETE', fullUrl, null, config);
    }

    // HEAD request with query parameters
    head(url, params = {}, config = {}) {
        const fullUrl = this.addQueryParameters(url, params);
        return this.request('HEAD', fullUrl, null, config);
    }

    // OPTIONS request with query parameters
    options(url, params = {}, config = {}) {
        const fullUrl = this.addQueryParameters(url, params);
        return this.request('OPTIONS', fullUrl, null, config);
    }

    // TRACE request with query parameters
    trace(url, params = {}, config = {}) {
        const fullUrl = this.addQueryParameters(url, params);
        return this.request('TRACE', fullUrl, null, config);
    }

    // Set request header
    setHeader(header, value) {
        this.instance.defaults.headers.common[header] = value;
    }

    // Set default timeout
    setTimeout(timeout) {
        this.instance.defaults.timeout = timeout;
    }

    // Add interceptor
    addInterceptor(onFulfilled, onRejected) {
        this.instance.interceptors.request.use(onFulfilled, onRejected);
        this.instance.interceptors.response.use(onFulfilled, onRejected);
    }

    // Add query parameters to URL
    addQueryParameters(url, params) {
        const queryString = new URLSearchParams(params).toString();
        return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
    }

    // Format error message
    formatErrorMessage(error) {
        if (error.response) {
            return `Server responded with status ${error.response.status}`;
        } else if (error.request) {
            return `No response received from server`;
        } else {
            return `Request failed: ${error.message}`;
        }
    }
}

module.exports = HttpEasy;
