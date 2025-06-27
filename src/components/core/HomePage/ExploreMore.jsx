import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);

  //this is used to set the color of current card
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  //update all three state variables
  const setMyCards = (value) => {
    setCurrentTab(value);

    //filter method always return an array
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };


  return (
    <div>
      {/* Explore more section */}

      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>


      {/* Tabs Section */}

      {/* w-max ==w-fit */}
      {/* Hide this element on small screens, show it as a flex container on large screens. */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
       
        {
          tabsName.map((ele, index) => {
          return (
            <div
              className={` text-[16px]  
              ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-400 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>

          );
        }
      )
    }
      </div>

{/* What it means (Tailwind CSS classes):
Class	Meaning
hidden	Hide the element on all screen sizes by default
lg:block	On large screens (lg ≥ 1024px), show it as a block
lg:h-[200px]	On large screens, set its height to 200px */}

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Cards Group */}
      {/*  left-->This moves the left edge of the box to the middle of the container. */}
       {/* left: 50%
Move the left edge of the element to the middle of its parent’s width.
If the parent is 800px wide:
50% = 400px
So the element’s left edge goes 400px from the left of the parent */}


      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {
          courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        }
      )
    }
      </div>
    </div>
  );
};

export default ExploreMore;