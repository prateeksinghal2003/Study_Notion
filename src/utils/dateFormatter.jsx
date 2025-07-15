export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }


//   export const formattedDate = (date) => { ... }
// Defines an arrow function named formattedDate.
// The function takes one parameter: date.
// It's exported so it can be used in other files/modules.
// new Date(date)
// Converts the input date (a string, timestamp, or Date object) into a JavaScript Date object.
// .toLocaleDateString("en-US", { ... })
// Formats the date according to U.S. locale rules.
// The options provided customize the output format.
// Formatting Options:
// month: "long" → Full month name (e.g., "January").
// day: "numeric" → Day of the month as a number (e.g., "15").
// year: "numeric" → Full year (e.g., "2025").