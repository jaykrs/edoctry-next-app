import Link from "next/link";

import css from "./ProfileSettingsComponent.module.css";
import { useState } from "react";
import Courses from "../courses/courses";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import Basic from "../BasicSettingsComponent/BasicSettingsComponent";
import ChangePassword from "../ChangePassword/ChangePassword";
import PhotoComponent from "../PhotoComponent/PhotoComponent";
import PrivacyComponent from "../PrivacyComponent/PrivacyComponent";
const ProfileSettingsComponent = (props) => {
  const {loading=false,setLoading=(()=>{})} = props;
  const [slug,setSlug] = useState("courses");
  const jsonData = [
    {
      id: "tab-1",
      ttl: "Courses",
      slug: "courses",
    },
    {
      id: "tab-2",
      ttl: "Payment History",
      slug: "history",
    },
    {
      id: "tab-3",
      ttl: "Edit Profile",
      slug: "basic",
    },
    {
      id: "tab-4",
      ttl: "Change Password",
      slug: "changePassword",
    },
    {
      id: "tab-5",
      ttl: "Photo",
      slug: "photo",
    },
    {
      id: "tab-6",
      ttl: "Privacy Settings",
      slug: "privacy",
    },
  ];

  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.tabs}>
          {jsonData?.map((item) => (
            <p
             // href={item.slug}
              className={({ isActive }) =>
                isActive ? [css.tab, css.tabActive].join(" ") : css.tab
              }
              key={item.id}
              onClick={()=> setSlug(item.slug)}
              style={{color:item.slug === slug ? "blue" :"",cursor:"pointer"}}
            >
              {item.ttl}
            </p>
          ))}
        </div>
        <div className={css.bdy}>
          {/* <Outlet /> */}
          {
            slug === "courses" ? 
            <Courses loading={loading} setLoading={setLoading} />
            : slug === "history" ? 
            <PaymentHistory loading={loading} setLoading={setLoading} /> 
            : slug=== "basic" ? <Basic loading={loading} setLoading={setLoading} /> 
            : slug==="changePassword" ? <ChangePassword loading={loading} setLoading={setLoading} />
            :slug === "photo" ? <PhotoComponent loading={loading} setLoading={setLoading} />
            :slug === "privacy" ? <PrivacyComponent loading={loading} setLoading={setLoading} />
            :""
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsComponent;
