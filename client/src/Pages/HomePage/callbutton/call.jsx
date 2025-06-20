import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6'

const call = () => {
  return (
    <> {/* Sticky Buttons */}
    <div className="sticky-buttons">
       {/* Call Button */}
       <a href="tel:+1234567890" className="call-button">
         <FaPhoneAlt />
       </a>

       {/* WhatsApp Button */}
       <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
         <FaWhatsapp />
       </a>
     </div></>
  )
}

export default call