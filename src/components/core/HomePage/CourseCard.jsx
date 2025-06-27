import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


// ?---->It prevents errors if cardData is null or undefined.

// Without ?., trying to access cardData.heading when cardData is undefined would cause an error.

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div

//     content-box (default)	Width/height = content only (padding + border are extra)
// border-box (Tailwind: box-border)	Width/height = includes content, padding, and border inside the size
// <div class="w-64 p-4 border-4 box-border"></div>
// Width will stay 256px total, including:
// Content
// 4px border
// 4 * 2 = 8px padding (left + right)
// ✅ So content shrinks to fit inside the box

// 🔍 In contrast:
// If you used box-content (default CSS):
// The padding and border would expand the box beyond w-64


      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
      
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>


     {/* line ke neche vala section */}
     
      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>

    </div>
  );
};

export default CourseCard;