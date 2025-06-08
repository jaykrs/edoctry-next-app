"use client"
import Link from "next/link";

import { useEffect, useState } from "react";
import axios from "axios";
import ConstData from "../../../urlConst";
const RichTextComp = (props) => {
  const {
    richTextName = ""
  } = props;
  const [cState, setCState] = useState(1);
  const [richText, setRichText] = useState("");
  useEffect(() => {
    handleBanner();
  }, []);

  const handleBanner = async () => {
    console.log("rr" +richTextName);
    await axios.get(ConstData.CMS_URL + "templates?filters[name][$eq]="+richTextName)
      .then(res => {
        setRichText(res.data.data[0].attributes.html_element);
      }).catch(err => {
        console.log(err);
      })
  }
  

  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: richText }} />
    </>
  );
  
};

export default RichTextComp;
