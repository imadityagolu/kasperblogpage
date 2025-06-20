import React from "react";
import styles from "./styles.module.css";
import { FaRegStar } from "react-icons/fa";
import star from "./star.png";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Ratings = () => {
  return (
    <div className={styles.ratings}>
      <div className={styles.mainstar}>5.5</div>
      <p>Average Rating</p>
      <p>Based on 2 ratings</p>

      <div className="starRates d-flex flex-column justify-content-center gap-1 mt-2 w-100 ">
        {/* RATING 1.0 */}

        <div className="d-flex  justify-content-around  gap-2 align-items-center  ">
          {/* STARS */}
          <span
            className="d-flex align-items-center"
            style={{ color: "#f39309" }}
          >
            <IoIosStar />
            <IoIosStarOutline />
            <IoIosStarOutline />
            <IoIosStarOutline />
            <IoIosStarOutline />
          </span>
          <p  className="m-0">1.0</p>

          <div className={styles["progress-bar"]}>
            <div className={styles.progress}></div>
          </div>
          <p style={{minWidth:'70px'}} className="m-0">2 Ratings</p>
        </div>
        {/* RATING 2.0 */}

        <div className="d-flex  justify-content-around  gap-2 align-items-center ">
          {/* STARS */}
          <span
            className="d-flex align-items-center"
            style={{ color: "#f39309" }}
          >
            <IoIosStar />
            <IoIosStar />
            <IoIosStarOutline />
            <IoIosStarOutline />
            <IoIosStarOutline />
          </span>
          <p className="m-0">2.0</p>

          <div className={styles["progress-bar"]}>
            <div className={styles.progress}></div>
          </div>
          <p style={{minWidth:'70px'}} className="m-0">8 Ratings</p>
        </div>
        {/* RATING 3.0 */}

        <div className="d-flex  justify-content-around  gap-2 align-items-center ">
          {/* STARS */}
          <span
            className="d-flex align-items-center"
            style={{ color: "#f39309" }}
          >
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStarOutline />
            <IoIosStarOutline />
          </span>
          <p className="m-0">3.0</p>

          <div className={styles["progress-bar"]}>
            <div className={styles.progress}></div>
          </div>
          <p style={{minWidth:'70px'}} className="m-0">9 Ratings</p>
        </div>

        {/* RATING 4.0 */}
        <div className="d-flex  justify-content-around  gap-2 align-items-center ">
          {/* STARS */}
          <span
            className="d-flex align-items-center"
            style={{ color: "#f39309" }}
          >
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStarOutline />
          </span>
          <p className="m-0">4.0</p>

          <div className={styles["progress-bar"]}>
            <div className={styles.progress}></div>
          </div>
          <p style={{minWidth:'75px'}} className="m-0">50 Ratings</p>
        </div>

        {/* RATING 5.0 */}
        <div className="d-flex justify-content-around gap-2 align-items-center ">
          {/* STARS */}
          <span
            className="d-flex  align-items-center"
            style={{ color: "#f39309" }}
          >
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </span>
          <p  className="m-0">5.0</p>

          <div className={styles["progress-bar"]}>
            <div className={styles.progress}></div>
          </div>
          <p style={{minWidth:'75px'}} className="m-0">40 Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
