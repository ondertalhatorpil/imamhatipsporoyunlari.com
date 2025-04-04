import React from 'react';

const SportsGridLayout = () => {
  return (
    <div className="min-h-[80vh] py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="text-center mb-16 animate-[fadeDown_0.8s_ease-out]">
        <h1 className="text-[#E84049] text-3xl md:text-5xl font-bold inline-block relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[3px] after:bg-[#E84049] after:animate-[expandWidth_0.8s_ease-out_forwards]">
          İmam Hatip Spor Oyunları
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg">
          Genç yetenekleri buluşturan, spor ve manevi değerleri bir araya getiren özel organizasyon
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E84049] to-[#ff6b6b] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
          <div className="p-4 bg-red-50 inline-block rounded-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E84049]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-[#E84049] text-2xl md:text-3xl font-bold mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[2px] after:bg-[#E84049] after:transition-all after:duration-300">
            Gençlere Sporun Gücüyle Değer Kazandırma
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Gençleri; sporun birleştirici ve disipline edici yönüyle buluşturmayı amaçlayan, imam hatip öğrencilerine özel olarak düzenlenen bir spor etkinliğidir. Öncü Spor Kulübü tarafından organize edilen etkinlik, gençlere sadece sportif beceriler değil, aynı zamanda manevi ve ahlaki değerler kazandırmayı hedeflemektedir.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E84049] to-[#ff6b6b] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
          <div className="p-4 bg-red-50 inline-block rounded-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E84049]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <h2 className="text-[#E84049] text-2xl md:text-3xl font-bold mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[2px] after:bg-[#E84049] after:transition-all after:duration-300">
            Geniş Katılım ve Çeşitli Spor Dalları
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Bu özel spor etkinliği, çeşitli branşlarda yarışmalar içermekte olup, futboldan basketbola, atletizmden güreşe kadar geniş bir yelpazede spor dallarını kapsamaktadır. Böylece öğrenciler ilgi duydukları spor dallarında yeteneklerini sergileyip geliştirme fırsatı bulurken, farklı spor dallarıyla tanışarak spor sevgisini artırmaktadır.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards] hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E84049] to-[#ff6b6b] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
          <div className="p-4 bg-red-50 inline-block rounded-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E84049]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-[#E84049] text-2xl md:text-3xl font-bold mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[2px] after:bg-[#E84049] after:transition-all after:duration-300">
            Takım Ruhu ve Dayanışma
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            İmam Hatip Spor Oyunları, öğrenciler arasında takım ruhunu ve dayanışma duygusunu güçlendirmeyi hedefleyen bir yapıya sahiptir. Takım sporları aracılığıyla öğrenciler, ortak hedeflerle birbirine destek olmanın önemini öğrenmektedir.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden opacity-0 animate-[fadeIn_0.8s_ease-out_0.8s_forwards] hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E84049] to-[#ff6b6b] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
          <div className="p-4 bg-red-50 inline-block rounded-lg mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E84049]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-[#E84049] text-2xl md:text-3xl font-bold mb-4 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[2px] after:bg-[#E84049] after:transition-all after:duration-300">
            Manevi ve Ahlaki Değerler
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Öncü Spor Kulübü'nün düzenlediği İmam Hatip Spor Oyunları'nda sporun fiziksel faydalarının ötesinde manevi ve ahlaki değerler de ön plana çıkarılmaktadır. Fair play ruhuyla rekabet eden öğrenciler; dostluk, saygı, hoşgörü ve sabır gibi erdemleri sahada ve tribünlerde sergilemektedir.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default SportsGridLayout;