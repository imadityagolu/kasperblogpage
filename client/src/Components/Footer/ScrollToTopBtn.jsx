import React from 'react'
import "./footer.css"
import { IoIosArrowDropupCircle } from "react-icons/io";
const ScrollToTopBtn = () => {
    // useEffect(() => {
    //     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    //   }, []);
  return (
    <div>
<button
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
        style={{
          textAlign: 'center',
          width:'fit-content',
          backgroundColor:'transparent',
          border:'none'
        }}
      >
       <div className='gototop'>
       <IoIosArrowDropupCircle className='fs-1 text-white' />
        <p className='fw-bold text-white'>TOP</p>
       </div>
      </button>
    </div>
  )
}

export default ScrollToTopBtn