## The first number meaning

<table>
    <thead>
        <tr>
            <th>Status code</th>
            <th>Category</th>
            <th>Meaning</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>1xx</th>
            <th>Informational</th>
            <th>Server is processing the request</th>
        </tr>
        <tr>
            <th>2xx</th>
            <th>Success</th>
            <th>the request is processed normally and successfully</th>
        </tr>
        <tr>
            <th>3xx</th>
            <th>Redirection</th>
            <th>Extra is imperative to finish the request</th>
        </tr>
        <tr>
            <th>4xx</th>
            <th>Client Error</th>
            <th>Because of the reason of the client, server cannot process the request</th>
        </tr>
        <tr>
            <th>5xx</th>
            <th>Server Error</th>
            <th>Because of the reason of the server, server cannot process the request</th>
        </tr>
    </tbody>
</table>

## Some of common status code

### 200 OK

### 204 No Content

### 301 Moved Permanently

### 302 Moved Temporarily 

### 303 POST redirect to GET

The resource is in the another URI, use GET to redirect to get it.

### 304 Not Modified

The server has processed the request, but the resource requested by the client is not modified in the server side.

### 400 Bad Request

There are some errors in the message or parameters

### 401 Unauthorized

### 403 Forbidden

### 404 Not Found

### 500 Internal Server Error

### 503 Service Unavailable
