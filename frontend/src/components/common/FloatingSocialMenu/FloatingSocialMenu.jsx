import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, Youtube, Share2 } from 'lucide-react';

const FloatingSocialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com/oncugenclikspor/",
      color: "#E1306C",
      label: "Instagram"
    },
    {
      icon: <Twitter size={18} />,
      url: "https://x.com/oncugenclikspor",
      color: "#1DA1F2",
      label: "Twitter"
    },
    {
      icon: <Facebook size={18} />,
      url: "https://www.facebook.com/OncuGenclikveSpor/",
      color: "#1877F2",
      label: "Facebook"
    },
    {
      icon: <Youtube size={18} />,
      url: "https://www.youtube.com/@ÖncüSporKulübü",
      color: "#FF0000",
      label: "Youtube"
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {/* Açılır menü */}
      <div
        className={`flex flex-col items-center mb-20 transition-all duration-300`}
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {socialLinks.map((link, index) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 mb-2 rounded-md shadow-md transition-all duration-300"
            style={{
              backgroundColor: link.color,
              transitionDelay: `${index * 70}ms`,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            <div className="text-white">{link.icon}</div>
          </a>
        ))}
      </div>

      {/* Ana toggle butonu */}
      <button
        className="w-10 h-10 rounded-md bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Sosyal medya butonları"
      >
        <Share2 size={18} />
      </button>
    </div>
  );
};

export default FloatingSocialMenu;
