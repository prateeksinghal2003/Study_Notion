const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")


// req.body is how you access the submitted data in an HTTP request when the request has a body (e.g., form submissions, JSON).
// The req object in Express (short for "request") contains information about the incoming HTTP request. Here are the most commonly used properties:

// | Property          | Description                                                                     |
// | ----------------- | ------------------------------------------------------------------------------- |
// | `req.body`        | Contains data sent in the **body** of the request (usually with `POST`, `PUT`). |
// | `req.params`      | Route parameters (e.g., `/user/:id` → `req.params.id`).                         |
// | `req.query`       | Query string parameters (e.g., `/search?q=book` → `req.query.q`).               |
// | `req.headers`     | Object containing the request headers.                                          |
// | `req.method`      | HTTP method (`GET`, `POST`, etc.).                                              |
// | `req.url`         | Full URL of the request.                                                        |
// | `req.path`        | Path part of the URL (e.g., `/api/contact-us`).                                 |
// | `req.cookies`     | Cookies sent by the client (requires cookie-parser middleware).                 |
// | `req.ip`          | IP address of the client.                                                       |
// | `req.protocol`    | Protocol used (e.g., `http`, `https`).                                          |
// | `req.hostname`    | Hostname of the request.                                                        |
// | `req.originalUrl` | The original request URL (before any middleware changes).                       |
// | `req.get(header)` | Shortcut to get a specific header value.                                        |


exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}