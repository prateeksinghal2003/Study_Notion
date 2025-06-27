import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",             
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (

    // xl -->screen width?=1280px

    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {
        LearningGridArray.map((card, i) => {
        return (
          <div
            key={i} 

            //for index number zero  ,it is taking two columns

          //   This is JavaScript template literal syntax. It’s used when you're building a string dynamically
          //   xl:col-span-2 means:
          // On extra-large screens, the grid item will span 2 columns instead of the default (1).
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              
              //if card order odd
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : 

                //check for even otherwise
                card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : 
                
                //for card having index -1
                "bg-transparent"


                //certification val card => start from column 2
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >

           {/* Use ()  ->For best practice (and sometimes necessary) for multi-line JSX, especially inside ternaries or return statements. */}
           {/* writing the content inside card */}
            {

             
            
            
            card.order < 0 ?  
            (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">

                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) 
            : 
            (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )
        }
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;