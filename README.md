# http-easy

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


`http-easy` is a lightweight Node.js package that simplifies making HTTP requests with ease.

## Features

- Promise-based: Uses Promises for handling asynchronous operations, allowing for easy chaining and error handling.
- Flexible Configuration: Ability to configure request headers, timeouts, and other options.
- Error Handling: Comprehensive error handling with meaningful error messages.
- Support for Common HTTP Methods: GET, POST, PUT, DELETE, etc.
- Support for Query Parameters and Request Body: Convenient methods for adding query parameters and request body data.
- Interceptors: Middleware-like functionality for intercepting and modifying requests and responses.

## Installation

```bash
npm install http-easy
```

## Usage

```javascript
const HttpEasy = require('http-easy');

const http = new HttpEasy();

// Making a GET request
http.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
```

For more examples and detailed usage, please refer to the [documentation](#).

## Documentation

For the full API documentation and usage examples, please refer to the [documentation](#).

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for any feature or bug fix.

## License

`http-easy` is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.


