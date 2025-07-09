import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}


//The object you pass to axiosInstance({...}) uses Axios-specific keys, not raw HTTP syntax. Here's how it maps:

// Axios Key	      Purpose (HTTP equivalent)
// method	        HTTP method (e.g., GET, POST, DELETE)
// url	            Endpoint URL
// data	        Request body (used for POST, PUT, etc.)
// headers	        Custom request headers (e.g., Authorization)
// Axios is a promise-based HTTP client for JavaScript. It allows you to:

// Send HTTP requests (GET, POST, PUT, DELETE, etc.)

// An Axios instance is a custom version of Axios with default configurations.


// But inside the returned object, you must use these exact keys:

// method

// url

// data

// headers

// params

// Because Axios expects these field names in the config object.


// Yes, exactly! An HTTP request always goes to a specific URL — the URL tells the browser or app where to send the request and what resource is being requested or modified.

// HTTP Request = Message
// It says:

// “Here’s what I want to do (GET, POST, etc.) and maybe some data too.”



// URL:
// arduino
// Copy
// Edit
// https://api.example.com/login
// HTTP Request:
// http
// Copy
// Edit
// POST https://api.example.com/login
// Content-Type: application/json

// {
//   "email": "test@gmail.com",
//   "password": "123456"
// }
// This says:

// “Send this login info to the /login endpoint on api.example.com.”

// Make an HTTP request

// To a specific URL

// Using a method (GET, POST, etc.)

// Optionally send data (body, headers, query)


// It returns the Promise from axiosInstance(...) — and that Promise contains the response from the backend API.

// So when you call apiConnector(...), you can do this:

// ✅ Example:
// js
// Copy
// Edit
// const response = await apiConnector("POST", "/api/login", {
//   email: "test@gmail.com",
//   password: "123456"
// });

// console.log(response.data);
// Here’s what happens:

// apiConnector(...) runs and sends a request using Axios.

// The backend responds (e.g., with { token: "abc123", user: {...} })

// That exact response is returned by axiosInstance(...)

// You receive that in the response variable

// 📦 What axiosInstance(...) returns:
// It returns a Promise that resolves to an object like this:

// js
// Copy
// Edit
// {
//   data: { ... },        // The actual API response body
//   status: 200,          // HTTP status code
//   statusText: "OK",
//   headers: { ... },
//   config: { ... }
// }
// So, yes — apiConnector gives you whatever the backend returns, through the Axios response.