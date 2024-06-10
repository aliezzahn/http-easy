const axios = require('axios');
const HttpEasy = require('../src/http-easy');

jest.mock('axios');

describe('HttpEasy', () => {
    let http;

    beforeEach(() => {
        http = new HttpEasy();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET method', () => {
        it('should make a GET request successfully', async () => {
            const responseData = { id: 1, name: 'Example' };
            axios.get.mockResolvedValueOnce({ data: responseData });

            const response = await http.get('https://example.com/api/resource');

            expect(response).toEqual(responseData);
            expect(axios.get).toHaveBeenCalledWith('https://example.com/api/resource', {});
        });

        it('should throw an error on failed GET request', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.get('https://example.com/api/resource')).rejects.toThrowError(`GET request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('POST method', () => {
        it('should make a POST request successfully', async () => {
            const requestData = { id: 1, name: 'Example' };
            const responseData = { success: true };
            axios.post.mockResolvedValueOnce({ data: responseData });

            const response = await http.post('https://example.com/api/resource', requestData);

            expect(response).toEqual(responseData);
            expect(axios.post).toHaveBeenCalledWith('https://example.com/api/resource', requestData, {});
        });

        it('should throw an error on failed POST request', async () => {
            const requestData = { id: 1, name: 'Example' };
            const errorMessage = 'Internal Server Error';
            axios.post.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.post('https://example.com/api/resource', requestData)).rejects.toThrowError(`POST request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('PUT method', () => {
        it('should make a PUT request successfully', async () => {
            const requestData = { id: 1, name: 'Example' };
            const responseData = { success: true };
            axios.put.mockResolvedValueOnce({ data: responseData });

            const response = await http.put('https://example.com/api/resource', requestData);

            expect(response).toEqual(responseData);
            expect(axios.put).toHaveBeenCalledWith('https://example.com/api/resource', requestData, {});
        });

        it('should throw an error on failed PUT request', async () => {
            const requestData = { id: 1, name: 'Example' };
            const errorMessage = 'Internal Server Error';
            axios.put.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.put('https://example.com/api/resource', requestData)).rejects.toThrowError(`PUT request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('DELETE method', () => {
        it('should make a DELETE request successfully', async () => {
            const responseData = { success: true };
            axios.delete.mockResolvedValueOnce({ data: responseData });

            const response = await http.delete('https://example.com/api/resource', { id: 1 });

            expect(response).toEqual(responseData);
            expect(axios.delete).toHaveBeenCalledWith('https://example.com/api/resource', { params: { id: 1 } });
        });

        it('should throw an error on failed DELETE request', async () => {
            const errorMessage = 'Not Found';
            axios.delete.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.delete('https://example.com/api/resource', { id: 1 })).rejects.toThrowError(`DELETE request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('HEAD method', () => {
        it('should make a HEAD request successfully', async () => {
            const responseHeaders = { 'content-type': 'application/json' };
            axios.head.mockResolvedValueOnce({ headers: responseHeaders });

            const headers = await http.head('https://example.com/api/resource', { id: 1 });

            expect(headers).toEqual(responseHeaders);
            expect(axios.head).toHaveBeenCalledWith('https://example.com/api/resource', { params: { id: 1 } });
        });

        it('should throw an error on failed HEAD request', async () => {
            const errorMessage = 'Forbidden';
            axios.head.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.head('https://example.com/api/resource', { id: 1 })).rejects.toThrowError(`HEAD request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('OPTIONS method', () => {
        it('should make an OPTIONS request successfully', async () => {
            const responseHeaders = { allow: 'GET, POST, HEAD, OPTIONS' };
            axios.options.mockResolvedValueOnce({ headers: responseHeaders });

            const headers = await http.options('https://example.com/api/resource');

            expect(headers).toEqual(responseHeaders);
            expect(axios.options).toHaveBeenCalledWith('https://example.com/api/resource', {});
        });

        it('should throw an error on failed OPTIONS request', async () => {
            const errorMessage = 'Gateway Timeout';
            axios.options.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.options('https://example.com/api/resource')).rejects.toThrowError(`OPTIONS request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });

    describe('TRACE method', () => {
        it('should make a TRACE request successfully', async () => {
            const responseData = { success: true };
            axios.request.mockResolvedValueOnce({ data: responseData });

            const response = await http.trace('https://example.com/api/resource');

            expect(response).toEqual(responseData);
            expect(axios.request).toHaveBeenCalledWith({ method: 'TRACE', url: 'https://example.com/api/resource' });
        });

        it('should throw an error on failed TRACE request', async () => {
            const errorMessage = 'Service Unavailable';
            axios.request.mockRejectedValueOnce(new Error(errorMessage));

            await expect(http.trace('https://example.com/api/resource')).rejects.toThrowError(`TRACE request to https://example.com/api/resource failed: ${errorMessage}`);
        });
    });
});
