import React, { useEffect, useState } from "react";

import css from "./SearchBar.module.css";
// import axios from "axios";
// import { CMS_URL } from "../../components/const/urlConst";
// import { useDispatch, useSelector } from "react-redux";
// import { AddMetadata } from "../../reducers/metadataSlicer"; 
// import { useRouter } from "next/router";
const SearchBar = (props) => {

  let [resultData, setResultData] = useState([]);
  let [searchStr,setSearchStr] = useState([]);
  let [searchKey,setSearchKey] = useState([]);
  let [mess,setMess] = useState("");
  // const navigate = useRouter();
  // const metadataCart = useSelector(state=>state.metadata.metadata);
 // const dispatch = useDispatch();
  // useEffect(() => {
  //   // if(metadataCart !== undefined){
  //   //   if(metadataCart.length !== 0){
  //   //     setResultData(metadataCart[0].data);
  //   //   }
  //   // }
  //   axios.get(CMS_URL + "/api/templates?filters[name][$eq]=metadata")
  //     .then(res => {
  //       setResultData(res.data.data[0].attributes.template.split(","));
  //       dispatch(AddMetadata({name:"metadata",data:res.data.data[0].attributes.template.split(",")}))
  //     }).catch(err => {
  //       console.log(err);
  //     })
  // }, [])
  const searchMetadata = async function (keyword, searchString){
    const pattern = new RegExp(`\\b\\w*${keyword}+\\w*\\b`);
    const matches = searchString.filter(word => pattern.test(word.trim()));
     return matches
  }
  const handleChange = async(e)=>{
    setSearchKey(e.target.value);
    if(e.target.value !== ""){
      let searchString = await searchMetadata(e.target.value,resultData);
      if(searchString.length === 0 ){
        setMess("Data Not Found")
      }else{
        setSearchStr(searchString);
      }
      
    }else{
      setSearchStr(resultData);
    }
    
  }
  const handleView = (item)=>{
     sessionStorage.setItem("CourseSearch",item);
     setSearchKey("");
     setSearchStr([]);
     setMess("")
     navigate("/Courses");
  }
  return (
    <div className={css.srchOuterdiv}>
      <div className={css.searchBar}>
        <div className={css.iconBox}>
          <img src={"/publicContent/icons/search.png"} alt="search icon" className={css.searchIcon} />
        </div>
        <input
          type="text"
          placeholder="Click here to search anythings"
          name="searchbar"
          id="searchbar"
          className={css.searchInpt}
          data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
        />
      </div>
      
    </div>
  );
};

export default SearchBar;
