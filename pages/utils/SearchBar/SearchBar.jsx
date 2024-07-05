import React, { useEffect, useState } from "react";
import css from "./SearchBar.module.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import('bootstrap/dist/js/bootstrap.bundle.min.js');
import { CMS_URL } from "../../urlConst";
import { useRouter } from "next/navigation";
export default function SearchBar(props) {
  let [resultData, setResultData] = useState([]);
  let [searchStr, setSearchStr] = useState([]);
  let [searchKey, setSearchKey] = useState([]);
  let [mess, setMess] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios.get(CMS_URL + "templates?filters[name][$eq]=metadata")
      .then(res => {
        // console.log("res.data.data[0].attributes.template.split(",")",res.data.data[0].attributes.template.split(","))
        setResultData(res.data.data[0].attributes.template.split(","));
      }).catch(err => {
        console.log(err);
      })
  }, [])
  const searchMetadata = async function (keyword, searchString) {
    const pattern = new RegExp(`\\b\\w*${keyword}+\\w*\\b`);
    const matches = searchString.filter(word => pattern.test(word.trim()));
    return matches
  }
  const handleChange = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value !== "") {
      let searchString = await searchMetadata(e.target.value, resultData);
      if (searchString.length === 0) {
        setMess("Data Not Found")
      } else {
        setSearchStr(searchString);
      }

    } else {
      setSearchStr(resultData);
    }

  }
  const handleView = (item) => {
    setSearchKey("");
    setSearchStr([]);
    setMess("")
    router.push("/courses/" + item);
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
      <div class="modal" id="exampleModal" data-bs-backdrop="static" data-bs-keyword="true">
        <div class="modal-dialog">
          <div class="modal-content w-70">
            <div class="modal-header">

              {/* <h5 class="modal-title" id="exampleModalLabel">New message</h5> */}
              <div className={css.searchBar} style={{ width: "90%" }}>
                <div className={css.iconBox}>
                  <img src={"/publicContent/icons/search.png"} alt="search icon" className={css.searchIcon} />
                </div>
                <input
                  type="text"
                  placeholder="Search for anything"
                  name="searchbar"
                  value={searchKey}
                  id="searchbar"
                  onChange={handleChange}
                  className={css.searchInpt}
                  autoComplete="false"

                />
              </div>
              <button type="button" class="btn-close" onClick={() => {
                setSearchStr([])
                setSearchKey("")
              }} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="m-3 mt-0">
                  <label for="recipient-name" class={css.contentHeader}>Contents</label>
                  {
                    searchStr?.length > 0 ? searchStr?.map((item, index) => {
                      return (
                        <>
                          <p key={index} onClick={() => handleView(item)} className={css.contentP} data-bs-dismiss="modal"  >{item} </p>
                        </>
                      )
                    })
                      : <p className={css.contentP} >{mess}</p>
                  }
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={() => {
                setSearchStr([])
                setSearchKey("")
              }} data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getStaticProps({ params }) {
//   const templateId = params.id;
//   let posts = "Error";
//   posts = await getCachedTemplate(templateId);
//   return {
//       props: {
//           posts,
//           templateId
//       },
//   }
// }

// export async function getCachedTemplate(templateId) {
//   const endpointUrl = process.env.API_HOST + 'templates?filters[name][$eq]=metadata';
//   let templateData = "No Data Available";
//   await fetch(endpointUrl, { next: { revalidate: 3600 } }).then(async (response) => { if (response.status === 200) templateData = await response.json(); }).catch((error) => console.error("Error " + error));
//   return templateData;
// };

// export async function getStaticPaths() {
//   return {
//       paths: [
//           { params: { id: '' } },
//       ],
//       fallback: true
//   }
// }
