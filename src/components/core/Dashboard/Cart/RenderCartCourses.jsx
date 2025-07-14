import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import GetAvgRating from '../../../../utils/avgRating'

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {

 //cart is containing all data related to courses  card   
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const count=[];

  for (let i = 0; i < cart.length; i++) {
   
      count.push( GetAvgRating(cart[i].ratingAndReviews) );
    
  }

   

  return (

    // The element will grow to fill the available space in its flex container.


    <div className="flex flex-1 flex-col">

      {
        cart.map((course, indx) => (

        
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `} >

         
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">

            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />

            <div className="flex flex-col space-y-1">

              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>

              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{count[indx]/course?.ratingAndReviews?.length}</span>

{/* | Attribute                | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `count={5}`              | Total number of stars to display (typically 5).                                      |
| `value={...}`            | The current rating value (can be decimal, like `4.5`).                               |
| `size={20}`              | Size of each star in pixels.                                                         |
| `edit={false}`           | If `false`, the stars are read-only. If `true`, users can interact and set a rating. |
| `activeColor="#ffd700"`  | The color of filled (active) stars. `#ffd700` is gold.                               |
| `emptyIcon={<FaStar />}` | The icon used for empty (unfilled) stars. You’re using FontAwesome's `FaStar`.       |
| `fullIcon={<FaStar />}`  | The icon used for filled stars. Also using `FaStar` here.                            | */}

                <ReactStars
                  count={5}
                  value={count[indx]/course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"  
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />

                <span className="text-richblack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>

              </div>
            </div>

          </div>


          {/* remove and rupee vala section */}
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            >

              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>


        </div>
      ))}
    </div>
  )
}