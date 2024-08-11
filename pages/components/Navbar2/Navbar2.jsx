import Link from "next/link";

import css from "./Navbar2.module.css";

const Navbar2 = () => {
  return (
    <>
      <div className={css.navbar}>
        <div className={css.left}>
          <Link className={css.logoBox} href="/">
            <img src="../../../../src/publicContent/images/logo/svg/logo-no-background.svg" alt="logo" className={css.logo} />
          </Link>
        </div>
        <div className={css.right}>
          <Link href="/cart" className={css.btn}>
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
