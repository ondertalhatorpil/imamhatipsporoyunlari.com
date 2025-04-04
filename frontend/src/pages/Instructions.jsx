import { useState } from 'react';
import { 
  Download, 
  Trophy, 
  Target, 
  Crosshair, 
  Table, 
  ActivitySquare
} from 'lucide-react';

const Instructions = () => {
  const [talimatnameler, setTalimatnameler] = useState([
    {
      id: 1,
      title: "Genel Talimatname",
      icon: "trophy",
      color: "pink",
      file: "genel-talimatname.pdf"
    },
    {
      id: 2,
      title: "Dart",
      icon: "target",
      color: "pink",
      file: "dart-talimatname.pdf"
    },
    {
      id: 3,
      title: "Geleneksel Türk Okçuluğu",
      icon: "crosshair",
      color: "pink",
      file: "okculuk-talimatname.pdf"
    },
    {
      id: 4,
      title: "Masa Tenisi",
      icon: "table",
      color: "pink",
      file: "masa-tenisi-talimatname.pdf"
    },
    {
      id: 5,
      title: "Taekwondo",
      icon: "activity",
      color: "pink",
      file: "taekwondo-talimatname.pdf"
    }
  ]);

  const handleDownload = (file) => {
    window.open(`/public/assets/talimatname/${file}`, '_blank');
  };

  // İkon seçme fonksiyonu
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

  return (
    <div className="w-full py-16 px-4 md:px-18 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Spor Talimatnameleri</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Branşlara özel talimatnameleri buradan indirebilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talimatnameler.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full bg-${item.color}-100 flex items-center justify-center mb-6`}>
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
                  {item.title}
                </h3>
                <button
                  onClick={() => handleDownload(item.file)}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <span>Talimatnameyi İndir</span>
                  <Download className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructions;