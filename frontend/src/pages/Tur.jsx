import React, { useState } from 'react';

function Tur() {
  const [takimlar, setTakimlar] = useState([
    'Takım 1',
    'Takım 2',
    'Takım 3',
    'Takım 4',
    'Takım 5',
    'Takım 6',
    'Takım 7',
    'Takım 8',
    'Takım 9',
    'Takım 10',
    'Takım 11',
    'Takım 12',
    'Takım 13',
    'Takım 14',
    'Takım 15',
    'Takım 16',
  ]);
  const [maclar, setMaclar] = useState([
    { takim1: 0, takim2: 1, sonuc: null },
    { takim1: 2, takim2: 3, sonuc: null },
    { takim1: 4, takim2: 5, sonuc: null },
    { takim1: 6, takim2: 7, sonuc: null },
    { takim1: 8, takim2: 9, sonuc: null },
    { takim1: 10, takim2: 11, sonuc: null },
    { takim1: 12, takim2: 13, sonuc: null },
    { takim1: 14, takim2: 15, sonuc: null },
  ]);
  const [guncellenecekMac, setGuncellenecekMac] = useState(null);
  const [guncellenecekSonuc, setGuncellenecekSonuc] = useState('');

  const macSonucunuGuncelle = (index, sonuc) => {
    const yeniMaclar = [...maclar];
    yeniMaclar[index].sonuc = sonuc;
    setMaclar(yeniMaclar);
  };

  const kazananTakimiBelirle = (mac) => {
    if (mac.sonuc === null) return null;
    return mac.sonuc === '1' ? takimlar[mac.takim1] : takimlar[mac.takim2];
  };

  const ustTuraGecenTakimlariBelirle = () => {
    const ustTurTakimlari = maclar
      .filter((mac) => mac.sonuc !== null)
      .map(kazananTakimiBelirle);
    return ustTurTakimlari;
  };

  const yeniTurMaclariniOlustur = () => {
    const ustTurTakimlari = ustTuraGecenTakimlariBelirle();
    const yeniMaclar = [];
    for (let i = 0; i < ustTurTakimlari.length; i += 2) {
      yeniMaclar.push({
        takim1: takimlar.indexOf(ustTurTakimlari[i]),
        takim2: takimlar.indexOf(ustTurTakimlari[i + 1]),
        sonuc: null,
      });
    }
    setMaclar(yeniMaclar);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Turnuva Ağacı</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          {maclar.map((mac, index) => (
            <div key={index} className="mb-2 p-2 border rounded">
              <p>
                {takimlar[mac.takim1]} vs {takimlar[mac.takim2]}
              </p>
              {mac.sonuc !== null && (
                <p className="font-semibold">Kazanan: {kazananTakimiBelirle(mac)}</p>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => {
                  setGuncellenecekMac(index);
                  setGuncellenecekSonuc(mac.sonuc === '1' ? '1' : mac.sonuc === '2' ? '2' : '');
                }}
              >
                Sonucu Güncelle
              </button>
              {guncellenecekMac === index && (
                <div>
                  <input
                    type="text"
                    value={guncellenecekSonuc}
                    onChange={(e) => setGuncellenecekSonuc(e.target.value)}
                    className="border p-1 mr-2"
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      macSonucunuGuncelle(index, guncellenecekSonuc);
                      setGuncellenecekMac(null);
                    }}
                  >
                    Kaydet
                  </button>
                </div>
              )}
            </div>
          ))}
          {maclar.every((mac) => mac.sonuc !== null) && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={yeniTurMaclariniOlustur}
            >
              Üst Tura Geç
            </button>
          )}
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-2">Yönetici Paneli</h2>
          {/* Yönetici paneli bileşenleri burada */}
        </div>
      </div>
    </div>
  );
}

export default Tur;