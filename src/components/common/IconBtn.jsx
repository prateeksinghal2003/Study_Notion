export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  })
//extra props can be defined and can set to default
//   The outline prop is typically used as a style toggle between two button variants:
// Outline style: border-only (no background)
// Solid style: filled background (default when outline = false)

// customClasses
// Type: string

// Used to add custom Tailwind classes from the parent.
// <IconBtn customClasses="bg-red-500 hover:bg-red-600" />


  {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }