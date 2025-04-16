import { useState } from 'react';
import {
  Download,
  Trophy,
  Target,
  Crosshair,
  Table,
  ActivitySquare,
  Search
} from 'lucide-react';

const Instructions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [talimatnameler, setTalimatnameler] = useState([
    {
      id: 1,
      title: "Genel Talimatname",
      icon: "trophy",
      color: "pink",
      file: "genel-talimatname.pdf",
      description: "Tüm spor branşları için geçerli genel kurallar ve yönergeler"
    },
    {
      id: 2,
      title: "Dart",
      icon: "target",
      color: "pink",
      file: "dart-talimatname.pdf",
      description: "Dart oyunu için uluslararası standartlara uygun talimatname"
    },
    {
      id: 3,
      title: "Geleneksel Türk Okçuluğu",
      icon: "crosshair",
      color: "pink",
      file: "okculuk-talimatname.pdf",
      description: "Geleneksel Türk okçuluğu kuralları ve uygulamaları"
    },
    {
      id: 4,
      title: "Masa Tenisi",
      icon: "table",
      color: "pink",
      file: "masa-tenisi-talimatname.pdf",
      description: "Masa tenisi müsabakaları için resmi talimatlar"
    },
    {
      id: 5,
      title: "Taekwondo",
      icon: "activity",
      color: "pink",
      file: "taekwondo-talimatname.pdf",
      description: "Taekwondo müsabakaları için teknik ve idari talimatname"
    }
  ]);

  const handleDownload = (file) => {
    window.open(`/public/assets/talimatname/${file}`, '_blank');
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-12 h-12 text-yellow-500" />;
      case 'target':
        return <Target className="w-12 h-12 text-red-500" />;
      case 'crosshair':
        return <Crosshair className="w-12 h-12 text-amber-700" />;
      case 'table':
        return <Table className="w-12 h-12 text-blue-500" />;
      case 'activity':
        return <ActivitySquare className="w-12 h-12 text-black" />;
      default:
        return null;
    }
  };

  const filteredTalimatnameler = talimatnameler.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            <span className="relative z-10">Spor Talimatnameleri</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-red-200 opacity-50 z-0"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Branşlara özel talimatnameleri buradan indirebilirsiniz
          </p>
        </div>

        <div className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Talimatname ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-sm"
            />
            <Search className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalimatnameler.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mr-4 transition-all duration-300 hover:scale-110">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">{item.description}</p>
                
                <button
                  onClick={() => handleDownload(item.file)}
                  className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center group"
                >
                  <span className="font-medium">Talimatnameyi İndir</span>
                  <Download className="ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTalimatnameler.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Aradığınız talimatname bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;