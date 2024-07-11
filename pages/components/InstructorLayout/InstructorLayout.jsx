// import InstructorMenuBar from "../../components/LayoutComponents/InstructorMenuBar/InstructorMenuBar";
// import InstructorNavbar from "../../components/LayoutComponents/InstructorNavbar/InstructorNavbar";
import Footer from "../Footer/Footer";
import css from "./InstructorLayout.module.css";
import LoggedInNavbar from "../LoggedInNavbar/LoggedInNavbar";

const InstructorLayout = ({ children }) => {
  return (
    <div className={css.outerDiv}>
      {/* <InstructorMenuBar /> */}
      {/* <InstructorNavbar /> */}
      <LoggedInNavbar />
      {/* <LoggedInNavbar /> */}
      <div className={css.innerDiv}>
        {/* <div className={css.dummy}></div> */}
        <div className={css.outletBdy}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorLayout;
