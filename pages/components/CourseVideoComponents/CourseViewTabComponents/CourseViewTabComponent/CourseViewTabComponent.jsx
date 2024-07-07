
import { useEffect, useState } from "react";
import css from "./CourseViewTabComponent.module.css";
import ReactMarkdown from "react-markdown";
const CourseViewTabComponent = (props) => {
  const { data = {} } = props;
  const [viewData,setViewData] = useState("");
  const [path,setPath] = useState("");
  
  useEffect(()=>{
    setViewData(data.unitBrief);
    setPath("Unit Brief")
  },[data])
  const tabs = [
    {
      id: 1,
      name: null,
      icon: "/publicContent/icons/search.png",
      //link: "search",
      
    },
    {
      id: 2,
      name: "Unit Brief",
      icon: null,
     // link: "overview",
     data: data.unitBrief
    },
    {
      id: 3,
      name: "Lab Project",
      icon: null,
     // link: "questions",
     data: data.unitLabProject,
    },
    {
      id: 4,
      name: "Chapter Brief",
      icon: null,
      //link: "notes",
     data:data.chapterBrief
    },
    {
      id: 5,
      name: "Chapter Content",
      icon: null,
     // link: "announcements",
      data:data.chapterContent,
    },
    {
      id: 6,
      name: "Chapter Resources",
      icon: null,
     // link: "reviews",
     data:data.chapterResourses
    },
  ];
  return (
    <div className={css.outerDiv}>
      <div className={css.tabs}>
        {tabs?.map((item) => {
          return (
            <div
              key={`tab-${item.id}`}
              //to={item.link ?? ""}
              onClick={()=>{
                setViewData(item.data);
                setPath(item.name);
              }}
              className={(e) => {
                if (e.isActive) {
                  return [css.tab, css.activeTab].join(" ");
                }
                return css.tab;
              }}
            >
              {item?.name ?
               <div>
                 {path === item.name ? <div style={{color:"blue"}}>{item.name}</div> : <div>{item.name}</div>}
               </div> 
               : null}
              {item?.icon ? (
                <img src={item.icon} alt="icon" className={css.icon} />
              ) : null}
            </div>
          );
        })}
      </div>
      {/* <div className={css.content}>
         <Outlet /> 
      </div> */}
      <div>
        <div className="row" style={{padding:"0 3% 10px 3%"}}>
          {
            (viewData !== null || viewData !== "") ? 
            <ReactMarkdown>{viewData}</ReactMarkdown>
            : <div>
               No Content 
            </div>
          }
        </div>
        {
          viewData === "" && 
          <div className="d-flex justify-content-center" style={{padding:"0 3% 10px 3%"}} >
             To View Content, Click on Section or respective video
          </div>
        }

      </div>
    </div >
  );
};

export default CourseViewTabComponent;
