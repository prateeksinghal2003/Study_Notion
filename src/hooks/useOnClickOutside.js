// A custom hook:
// In React, a custom hook is simply:

// A JavaScript function that starts with use and uses other React hooks inside it (useEffect, useState, etc.)
// ✅ It starts with use... → ✅ Custom hook naming rule

// ✅ It uses React’s built-in hook useEffect → ✅ Uses other hooks

// ✅ It encapsulates reusable logic for outside clicks

// ✅ It doesn’t return JSX — it just handles behavior











import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // Define the listener function to be called on click/touch events

//  useEffect only runs once (after initial render) or when [ref, handler] change.
// But the listener function itself (defined inside useEffect) is attached to the document and runs every time a click or touch happens — regardless of whether useEffect runs again or not.

    const listener = (event) => {
      // If the click/touch event originated inside the ref element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Otherwise, call the provided handler function
//       internally it is like this 
// handler=() => setOpen(false)
// when handler is called 
// so basically changing state of open , becoming false
// So dropdown hides
//although event is passed , it can ignore during the execution
//extra parameters allowed

      handler(event);
    };

    // Add event listeners for mousedown and touchstart events on the document

// It represents the entire HTML document that is currently loaded.
// It's the root of the DOM tree.
// You can attach listeners to it to capture any click or touch that happens anywhere on the page.


//As soon as you press the mouse button
//Fires when a finger touches the screen (on mobile/tablets).

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Only run this effect when the ref or handler function changes
}


// React automatically runs the cleanup function when:

// The component unmounts

// Or the dependencies change (like ref or handler)

// 🧠 Why remove event listeners in cleanup?
// If you don’t remove them:

// You’ll keep adding new listeners on every render

// Old ones won’t go away → causes memory leaks and bugs (like duplicate triggers)

