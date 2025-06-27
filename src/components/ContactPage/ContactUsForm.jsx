import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiConnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)


  // useForm() is a custom hook provided by react-hook-form. It returns a set of tools and helpers to manage form state, validation, submission, and more.
  //these are predefined functions of useForm() hook


// register-->When you use register, you're telling React Hook Form:
// "Hey, this input is part of the form. Please watch it."
// So now:
// It remembers the value the user types in.
// It checks for errors (like if the field is empty when it’s required).
// It includes the input’s value when the form is submitted.


//handleSubmit--Prevents form submission if there are errors
//Gathers the form data for you
//You use it to handle the form’s submission safely and correctly.

//reset-->Clears the form or sets it back to default values.

//formState is an object provided by useForm() that holds information about the current state of the form, like:
// validation errors,
// whether it's been submitted,
// whether the form is dirty (changed),
// and more.



// 1. errors
// An object that holds validation errors for each field.
// If a field has an error, you'll find it here.

// 2. isSubmitSuccessful
// A boolean.
// Becomes true after the form has been successfully submitted (no validation errors).

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
     console.log("Form Data - ", data)
    try {

        //jab tak api call tab tak wait 
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }



 // Ensures that once the form is successfully submitted, all fields get cleared properly.
 //It becomes true after a successful handleSubmit() call (no validation errors).


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",

        // if i want to make it false again after submitting the form
         // keepIsSubmitSuccessful: false,
      })
    }
  }, [reset,isSubmitSuccessful])


//   User submits the form (by pressing Enter or clicking a submit button).
// handleSubmit(...):
// Validates all registered form fields.
// If valid, calls your submitContactForm(data) with the form values.
// If invalid, displays errors and prevents submission.
//The data passed by handleSubmit to the function (like submitContactForm) is the form data collected from the inputs that have been
 //registered using register() from React Hook Form.

// example
// <input {...register("email")} />

//data  sent-----
// {
//   email: "the value typed in the input"
// }


  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">

        {/* first name ki div */}
        <div className="flex flex-col gap-2 lg:w-[48%]">

{/* 
      A <label> is an HTML element that defines a text caption for a form input (like a text box, radio button, etc.).
      It improves:

       Accessibility 👓 (screen readers know what the input is for)
      Usability 🧑‍💻 (clicking the label focuses the input)

       1. htmlFor="firstname"
       it contains the id of the input field of which we want to connect
      Connects the label to the input field with the id="firstname".
      So when a user clicks the label, it focuses that input. ==>the cursor appear on that input field
     {/* “This label belongs to the input with ID firstname.” */}


          {/* html for-->label is connected to input tag */}
          {/* label-style -->specifying color and size */}
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>

          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"

            // this is mandatory
// What is register?
// register is a function from the useForm() hook in React Hook Form.
// It connects your input field to the form system so it:
// Tracks the input's value
// Handles validation
// Includes it during form submission

// 🔍 Breaking down the line:
// register("firstname", { required: true })
// "firstname" is the name of the input field in the form data.

//{required:true}
//is a validation rule in React Hook Form. Specifically, it's saying:
//🔒 This field is required, and if the user leaves it empty, show the message "Email is required".
// { required: true } adds a validation rule: this field must be filled out.
// This function call returns some important props, like:

// {
//   onChange: ...,   // Updates form value
//   onBlur: ...,     // Triggers validation
//   name: "firstname",
//   ref: ...         // Attaches the input to the form
// }
// {...register(...)} — The spread operator
// You're spreading those props into the input, so that React Hook Form can manage it properly.

// It’s the same as writing:
// <input
//   onChange={...}
//   onBlur={...}
//   name="firstname"
//   ref={...}
// />
// But with one short line.

// 🧠 In plain English:
// "Hey form, please track this field called 'firstname'. Also, make sure it's not empty. If it is, show an error."



  // errors-->It’s an object with field names as keys and error info as values. 
  //errors is an object provided by React Hook Form via formState.
 //It contains validation errors for each field in your form.
//  If the user leaves the email field empty, and you have this rule:

// register("email", { required: "Email is required" })
// Then errors.email will be:

// {
//   type: "required",
//   message: "Email is required"
// }

// But if the email is valid, errors.email will be:
// undefined




            {...register("firstname", { required: true })}
          />

          {/* this is done for error handling */}
          {

          


            errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )
        }
        </div>

         
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>

          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"

  //  No validation object given	So it's optional (not required by default)
            {...register("lastname")}
          />
        </div>



      </div>

         {/* email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

       {/* phone-number */}
      <div className="flex flex-col gap-2">

        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

       {/* for dropdown field and phone number field */}
        <div className="flex gap-5">

          {/* this div is for dropdown menu */}

        {/* The <select> tag in HTML is used to create a drop-down list.
        The <option> tag defines individual items in a <select> dropdown.   
       value attribute is the value that will be submitted if this option is selected.*/}

          <div className="flex w-[81px] flex-col gap-2">
            <select
          
              name="firstname"
              id="firstname"
            
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {
                CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                )
              }
            )
          }
            </select>
          </div>

      
          {/* this div is used for phone number  */}
       {/* see docs:   https://react-hook-form.com/get-started */}

       {/* pattern:What It Allows:
               Strings only made of numbers
               With length between 10 and 12 characters */}

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
                pattern: {
              value: /^[0-9]{10,12}$/,
            message: "Phone number must be 10 to 12 digits",
                  }
              }
            )
          }
            />
          </div>

        </div>

        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>


 
       {/* message box */}
      <div className="flex flex-col gap-2">

        <label htmlFor="message" className="lable-style">
          Message
        </label>

        <textarea 
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />

        {
          errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>


    {/* If loading === true, the element is disabled (cannot be clicked or interacted with).
    If loading === false, the element is enabled (fully usable). */}


      <button                                             
        disabled={loading}         
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"

            // When the element is disabled, apply the background color richblack-500.
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>

    </form>
  )
}

export default ContactUsForm