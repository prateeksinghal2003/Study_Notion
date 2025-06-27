import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {FreeMode , Pagination,Autoplay,Navigation} from 'swiper/modules'
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import 'swiper/css/navigation';

import Course_Card from './Course_Card'


const CourseSlider = ({Courses}) => {
  return (
    
   Courses?.length ? 
   (
    <Swiper slidesPerView={1} loop={true} spaceBetween={200}    pagination={{ clickable: true }} modules={[Pagination,Autoplay,Navigation]}
      autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} navigation={true} breakpoints={{1024:{slidesPerView:3}}}>
      {
        Courses.map((course, index) => (
        <SwiperSlide key={index} >
          {/* Render your course content here */}
          <Course_Card course={course}  Height={"h-[250px]"}></Course_Card>
        </SwiperSlide>
      )
      )
     }
    </Swiper>
  ) : null
);

}

export default CourseSlider