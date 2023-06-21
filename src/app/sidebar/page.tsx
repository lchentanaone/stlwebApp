import React from "react";
import styles from "./../page.module.css";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <h3>Branch</h3>
          <ul>
            <li>
              <Link href="/branch" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/branches" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <h3>User</h3>
          <ul>
            <li>
              <Link href="/user" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/users" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3>Lotto Results</h3>
          <ul>
            <li>
              <Link href="/lotto" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/lottos" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3>Expenses</h3>
          <ul>
            <li>
              <Link href="/expense" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/expenses" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3>Tapada</h3>
          <ul>
            <li>
              <Link href="/tapada" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/tapadas" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3>Journal</h3>
          <ul>
            <li>
              <Link href="/journal" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/journals" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3>Accounting Charts</h3>
          <ul>
            <li>
              <Link href="/accounting" className={styles.textColor}>
                Add
              </Link>
            </li>
            <li>
              <Link href="/accountings" className={styles.textColor}>
                View
              </Link>
            </li>
          </ul>
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
