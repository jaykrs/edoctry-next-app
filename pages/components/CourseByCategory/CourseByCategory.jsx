
import React, { useEffect, useState } from "react";
import css from "./CourseByCategory.module.css";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
const CourseByCategory = ({data={},extraCss={},from=""}) => {

  const router = useRouter();
  const [userType,setUserType] = useState("");
  useEffect(()=>{
    let userTypes = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
    setUserType(userTypes);
  },[])
  
  const handleOnClick = () => {

    if (userType === "instructor" && from=== "insHome") {
      sessionStorage.setItem("courseInsId", data.id);
      sessionStorage.setItem("courseTitle", data.attributes.course_title);
      router.replace("/user/my-courses/courseView/card");
      return;
  
    } else {
      localStorage.setItem("courseId", data.id);
    }
    router.push(`/coursedetails/${data.id}`)
    
  }
  return (
    <>
      <section class="course-category category-01 gray-bg">
        <div class="section-padding">
            <div class="container">
                <div class="category-slider owl-carousel owl-loaded owl-drag">
                   <div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(-1899px, 0px, 0px); transition: 0.25s; width: 3165px;"><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/1.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-layers"></i><span class="item-title">Design</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/2.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-chemistry"></i><span class="item-title">Development</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/3.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-puzzle"></i><span class="item-title">IT &amp; Software</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/4.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-briefcase"></i><span class="item-title">Business</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/5.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-handbag"></i><span class="item-title">Marketing</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/1.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-layers"></i><span class="item-title">Design</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/2.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-chemistry"></i><span class="item-title">Development</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/3.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-puzzle"></i><span class="item-title">IT &amp; Software</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/4.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-briefcase"></i><span class="item-title">Business</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item active" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/5.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-handbag"></i><span class="item-title">Marketing</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned active" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/1.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-layers"></i><span class="item-title">Design</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned active" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/2.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-chemistry"></i><span class="item-title">Development</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned active" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/3.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-puzzle"></i><span class="item-title">IT &amp; Software</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned active" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/4.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-briefcase"></i><span class="item-title">Business</span>
                                </div>
                            </a>
                        </div>
                    </div></div><div class="owl-item cloned" style="width: 196px; margin-right: 15px;"><div class="item radius text-center">
                        <div class="item-thumb"><img class="radius" src="images/category/5.jpg" alt="Item Thumbnail" /></div>
                        <div class="item-details">
                            <a href="#">
                                <div class="item-texts">
                                    <i class="icon-handbag"></i><span class="item-title">Marketing</span>
                                </div>
                            </a>
                        </div>
                    </div></div></div></div><div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><span aria-label="Previous">‹</span></button><button type="button" role="presentation" class="owl-next"><span aria-label="Next">›</span></button></div><div class="owl-dots disabled"><button role="button" class="owl-dot active"><span></span></button></div></div>
        </div>
        </div>
    </section>
    </>
  );
};

export default CourseByCategory;
