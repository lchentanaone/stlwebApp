import React from "react";
import styles from "./../page.module.css";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/branch" className={styles.textColor}>
            Branch
          </Link>
        </li>
        <li>
          <Link href="/branches" className={styles.textColor}>
            View
          </Link>
        </li>
        <li>
          <Link href="/user" className={styles.textColor}>
            User
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
