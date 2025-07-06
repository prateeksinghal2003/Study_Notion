import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) 
    {
         // if not sign up go to signup page   
      navigate("/signup");
    }
    // 
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();

    //signup se data nikalooo
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (

    // place-items-center will center the child elements

    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {
        loading ? 
        (
        <div>
          <div className="spinner"></div>
        </div>
        ) 
        
        : 
        
         (
        <div className="max-w-[500px] p-4 lg:p-8">

          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>

          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>

          {/* This is using the react-otp-input package to render a 6-digit OTP input (one input box per digit), customized for styling and layout.

          value={otp}
         Binds the current OTP value to the component.
         otp is a React state:

         onChange={setOtp}
Whenever the user types a digit, setOtp is called.
setOtp updates the otp string as the user fills the boxes.

3. numInputs={6}
Renders 6 input boxes (for a 6-digit OTP).

4. renderInput={(props) => (...)}
This lets you customize each individual input box.

react-otp-input generates props for each input like:

js
Copy
Edit
{
  value: otp[i],              // character at position i (e.g., otp[0] = '1')
  onChange: handleChange,     // built-in logic to update correct position
  onKeyDown: handleKey,       // to support Backspace, arrow keys
  onFocus: handleFocus,       // auto-focus logic
  onBlur: ...
  type: 'tel',                // default input type
  ...
}

These are passed to your renderInput function for each box.

So when you do:

jsx
Copy
Edit
<input {...props} />
You're assigning:

The correct digit from the otp state

The correct onChange, onFocus, etc.


 How does setOtp update?
Every time a user types:

onChange inside props is triggered

It uses the index of the box to modify that character in the otp string

Then calls your setOtp(updatedValue)

So otp is updated → new props are generated → inputs re-render. */}


{/* internally;
react-otp-input
It listens for user input in each box.

It combines all the individual characters into a single string.
then calls setotp(combined numbers from each box as a string); */}


          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: " 0px 1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}

                 //containerStyle is a predefined prop in the react-otp-input package.
                //  What does containerStyle do?
               // It's used to style the wrapper <div> that contains all the OTP input boxes.
              containerStyle={{
                justifyContent: "space-between",
                //vertical gap is zero
                gap: "0 6px",
              }}
            />

            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>


          <div className="mt-6 flex items-center justify-between">

            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>

           
           {/* if click on resend button =>send otp again */}
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email,navigate))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default VerifyEmail;