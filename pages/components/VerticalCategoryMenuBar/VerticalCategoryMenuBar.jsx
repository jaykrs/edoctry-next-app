import { useEffect, useState } from "react";
import css from "./VerticalCategoryMenuBar.module.css";
import axios from "axios";
const VerticalCategoryMenuBar = () => {
  const [category,setCategory] = useState([]);
  useEffect(() => {
    categoriesData();
    const cats = document.getElementById("cats");
    const catDivs = document.getElementsByClassName("categoryDiv");
    const subCatDivs = document.getElementsByClassName("subCatDiv");
    cats.addEventListener("mouseover", (e) => {
      const catId = e.target.id?.split("-")[1] || 0;
      const subCatId = "subCat-" + catId;

      const subCats = document.getElementsByClassName(subCatId);

      for (let i = 0; i < subCats.length; i++) {
        subCats[i].style = "display: flex";
      }
    });

    for (let i = 0; i < catDivs.length; i++) {
      catDivs[i].addEventListener("mouseleave", () => {
        subCatDivs[i].style = "display: none";
      });
    }

    for (let i = 0; i < subCatDivs.length; i++) {
      subCatDivs[i].addEventListener("mouseover", () => {
        subCatDivs[i].style = "display: flex";
      });
      subCatDivs[i].addEventListener("mouseleave", () => {
        subCatDivs[i].style = "display: none";
      });
    }

    return () => {
      cats.removeEventListener("mouseover", (e) => {
        const catId = e.target.id?.split("-")[1] || 0;
        const subCatId = "subCat-" + catId;

        const subCats = document.getElementsByClassName(subCatId);

        for (let i = 0; i < subCats.length; i++) {
          subCats[i].style = "display: none";
        }
      });

      for (let i = 0; i < catDivs.length; i++) {
        catDivs[i].removeEventListener("mouseleave", () => {
          subCatDivs[i].style = "display: none";
        });
      }
      for (let i = 0; i < subCatDivs.length; i++) {
        subCatDivs[i].removeEventListener("mouseover", () => {
          subCatDivs[i].style = "display: flex";
        });
        subCatDivs[i].addEventListener("mouseleave", () => {
          subCatDivs[i].style = "display: none";
        });
      }
    };
  }, []);

  let categoriesData = async () => {
    // if (reduxData.length === 0) {
    //   await httpList("/api/templates?filters[name][$eq]=categories", false)
    //     .then(async res => {
    //       setCategory(res.data.data[0].attributes.json);
    //     }).catch(err => {
    //       console.log('categories err', err);
    //     })
    // }else{
    //   let temp = await reduxData.find(el=> el.name === "categories");
    //   if(temp != undefined){
    //     setCategory(temp.data);
    //   }else{
    //     await httpList("/api/templates?filters[name][$eq]=categories", false)
    //     .then(async res => {
    //       setCategory(res.data.data[0].attributes.json);
    //     }).catch(err => {
    //       console.log('categories err', err);
    //     })
    //   }
    // }
  };
  return (
    <>
      <div className={css.outerDiv} id="vouterDiv">
      <div className={css.innerDiv}>
        <div className={css.cats} id="cats">
          {
          category.length > 0 ?
            category.map((cat) => {
              return (
                <div
                  key={cat.id}
                  className={[css.category, "categoryDiv"].join(" ")}
                  id={`cat-${cat.id}`}
                >
                  {cat.ttl}
                </div>
              )
            })
            : ""
            }
        </div>

        <div className={css.iconBox}>
          <span>Scroll</span>
          <img src={"/publicContent/icons/down-arrow.svg"} alt="right arrow" className={css.icon} />
        </div>
      </div>
      {category?.map((cat) => (
        <div
          className={[css.subCat, `subCat-${cat.id}`, "subCatDiv"].join(" ")}
          key={`subcatCat-${cat.id}`}
          id={`subCat-${cat.id}`}
        >
          {cat.sub?.map((item) => (
            <div
              key={`subcat-${item.id}`}
              id={`subcat-${item.id}`}
             // className={css.subCategory}
            >
              {/* {item.ttl} */}
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
};

export default VerticalCategoryMenuBar;
