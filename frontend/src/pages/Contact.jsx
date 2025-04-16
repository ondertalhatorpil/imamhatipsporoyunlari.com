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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with extra top margin */}
        <div className="text-center mb-16 mt-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            <span className="relative z-10">İletişim</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-red-200 opacity-50 z-0"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bizimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz
          </p>
        </div>

        {/* Main Content - Realigned */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Left Section - Contact Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-4 rounded-full">
                  <FaMapLocationDot className="text-2xl text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Adres</h3>
                  <p className="text-gray-600">{officeLocation.address}</p>
                  <a 
                    href="https://maps.google.com/?q=Akşemsettin Mh. Şair Fuzuli Sk. No: 22 Fatih İstanbul" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-red-500 hover:text-red-700 font-medium"
                  >
                    Yol tarifi al →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-4 rounded-full">
                  <FaSquarePhone className="text-2xl text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Telefon</h3>
                  <p className="text-gray-600">0530 915 92 93</p>
                  <a 
                    href="tel:+905309159293" 
                    className="inline-block mt-3 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Hemen ara →
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-4 rounded-full">
                  <IoMdMailUnread className="text-2xl text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">E-posta</h3>
                  <p className="text-gray-600">oncugeclikvespor@gmail.com</p>
                  <a 
                    href="mailto:oncugeclikvespor@gmail.com" 
                    className="inline-block mt-3 text-green-500 hover:text-green-700 font-medium"
                  >
                    E-posta gönder →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Map - Now aligns with the three contact cards */}
          <div className="lg:col-span-3">
            <div className="bg-white p-5 rounded-xl shadow-lg h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Konum</h3>
              <div className="rounded-lg overflow-hidden h-[calc(100%-3rem)]">
                <iframe
                  src={officeLocation.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "312px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Section - Centered below all content */}
        <div className="flex justify-center">
          <img 
            src="/assets/YatayLogo.png" 
            alt="Öncü Spor Kulübü Logo" 
            className="max-w-xs w-full" 
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;