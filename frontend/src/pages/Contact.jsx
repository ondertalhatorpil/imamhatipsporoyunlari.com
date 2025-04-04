import React from 'react';

import { FaMapLocationDot } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";



const Contact = () => {
  const officeLocation = {
    address: "Akşemsettin Mh. Şair Fuzuli Sk. No: 22 Fatih - İstanbul",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.279304538311!2d28.94977297672728!3d41.01762017134385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f11e6745e3%3A0x1d3b7e17a5d8c3d3!2sAksemsettin%2C%20Fuzuli%20Cd.%20No%3A22%2C%2034080%20Fatih%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1708642151749!5m2!1str!2str"
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start text-gray-700 w-full md:w-1/2">
            <a href="#" className="flex items-center gap-3 text-lg mb-4 hover:text-red-500">
              <FaMapLocationDot className="text-2xl text-gray-400" />
              <span>{officeLocation.address}</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-lg mb-4 hover:text-red-500">
              <FaSquarePhone className="text-2xl text-gray-400" />
              <span>0530 915 92 93</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-lg hover:text-red-500">
              <IoMdMailUnread className="text-2xl text-gray-400" />
              <span>oncugeclikvespor@gmail.com</span>
            </a>
            <img src="/assets/YatayLogo.png" alt="Öncü Spor Kulübü Logo" className="mt-6 w-48" />
          </div>
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={officeLocation.mapUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;