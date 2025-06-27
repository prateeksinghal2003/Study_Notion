import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {

  //this variable is used to show the email on resend email page  
  const [email, setEmail] = useState("")

  //this works as a  flag variable to show reset password page or resend email page3
  const [emailSent, setEmailSent] = useState(false)


  //returning dispatch function
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) 
      :
      
      //if loading fails --> page dikhaau
      //either resend email or resend password
      //that depends whether mail has been sent or not 
       (
        <div className="max-w-[500px] p-4 lg:p-8">

          {/* h1 main ya to resend mail or forgot password */}

          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {
                !emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`
              }
          </p>



          <form onSubmit={handleOnSubmit}>

            {
              !emailSent && (

              <label className="w-full">
               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200 ">*</sup>
                </p>


                <input
                  required
                  type="email"
                  name="email"
                  value={email}

                  //input field main jo bhi likh rahe hain vo setEmail ke through email variable main store ho raha hain
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}



            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {
                //if email not sent 
                !emailSent ? "Reset Password " : "Resend Email"}
            </button>

          </form>


          {/* Back to login vala button */}
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>


        </div>
      )}
    </div>
  )
}

export default ForgotPassword