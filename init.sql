-- Veritabanı oluşturma
CREATE DATABASE IF NOT EXISTS spor_galeri;
USE spor_galeri;

-- Turnuvalar tablosu
CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sport_type VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE
);

-- Aşamalar tablosu
CREATE TABLE IF NOT EXISTS stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tournament_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  order_num INT NOT NULL,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE
);

-- Maçlar tablosu
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stage_id INT NOT NULL,
  team1_name VARCHAR(255) NOT NULL,
  team2_name VARCHAR(255) NOT NULL,
  match_time DATETIME NOT NULL,
  team1_score INT DEFAULT NULL,
  team2_score INT DEFAULT NULL,
  is_finished BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (stage_id) REFERENCES stages(id) ON DELETE CASCADE
);

-- Fotoğraflar tablosu
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  year VARCHAR(4) NOT NULL,
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcılar tablosu (Admin girişi için)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Örnek Veriler

-- Admin kullanıcısı (şifre: oncü1958*)
INSERT INTO users (username, password, is_admin) VALUES
('admin', '$2b$10$4qO3iAQY6oL3zqIdkBDx/OvnMhZQhE1sdGcS90AQrW0mHRMw9j/5W', true);

-- Örnek Turnuvalar
INSERT INTO tournaments (name, sport_type, start_date, end_date) VALUES
('15. İmam Hatip Spor Oyunları - Voleybol', 'Voleybol', '2024-04-01', '2024-04-30'),
('15. İmam Hatip Spor Oyunları - Basketbol', 'Basketbol', '2024-04-01', '2024-04-30'),
('15. İmam Hatip Spor Oyunları - Futbol', 'Futbol', '2024-04-01', '2024-04-30');

-- Örnek Aşamalar
INSERT INTO stages (tournament_id, name, order_num) VALUES
(1, 'İlk Tur', 1),
(1, 'Çeyrek Final', 2),
(1, 'Yarı Final', 3),
(1, 'Final', 4),
(2, 'İlk Tur', 1),
(2, 'Yarı Final', 2),
(2, 'Final', 3),
(3, 'Grup Aşaması', 1),
(3, 'Yarı Final', 2),
(3, 'Final', 3);

-- Örnek Maçlar
INSERT INTO matches (stage_id, team1_name, team2_name, match_time, team1_score, team2_score, is_finished) VALUES
-- Voleybol Turnuvası
(1, 'Ahmet Şişman Kız AİHL', 'Bakırköy AİHL', '2024-04-07 10:00:00', 3, 1, true),
(1, 'Ali Fuat Cebesoy Kız AİHL', 'İstanbul Kız AİHL', '2024-04-07 11:00:00', 2, 3, true),
(1, 'B.Paşa Mithat İzzet Özgül Kız AİHL', 'Fatih Kız AİHL', '2024-04-07 12:00:00', NULL, NULL, false),
(1, 'Esenler Güzide Özilhan Kız AİHL', 'İzzet Ünver AİHL', '2024-04-07 13:00:00', NULL, NULL, false),

-- Basketbol Turnuvası
(5, 'Sarıyer Kız AİHL', 'Necmettin Erbakan Kız AİHL', '2024-04-09 10:00:00', 75, 68, true),
(5, 'Sultangazı Mimar Sinan Kız AİHL', 'İBB Yavuz Sultan Selim Kız AİHL', '2024-04-09 11:00:00', 62, 70, true),

-- Futbol Turnuvası
(8, 'Şehit Türkmen Tekin Kız AİHL', 'B.Osmanpaşa Kazım Karabekir Kız AİHL', '2024-04-08 14:00:00', 2, 1, true),
(8, 'Şehit Mehmet Karaaslan Kız AİHL', 'Güngören İTO Kız AİHL', '2024-04-08 15:30:00', 0, 0, true),
(8, 'Ali Şükrü Sula Kız AİHL', 'G.Osmanpaşa Osmangazi KAİHL', '2024-04-08 17:00:00', NULL, NULL, false);

-- Örnek Fotoğraflar
INSERT INTO photos (title, url, year, download_count) VALUES
('15. İmam Hatip Spor Oyunları - Voleybol Final', '/uploads/gallery/2024/voleybol-final.jpg', '2024', 45),
('15. İmam Hatip Spor Oyunları - Basketbol Yarı Final', '/uploads/gallery/2024/basketbol-yarifinal.jpg', '2024', 32),
('15. İmam Hatip Spor Oyunları - Futbol Açılış', '/uploads/gallery/2024/futbol-acilis.jpg', '2024', 27),
('15. İmam Hatip Spor Oyunları - Ödül Töreni', '/uploads/gallery/2024/odul-toreni.jpg', '2024', 65),
('14. İmam Hatip Spor Oyunları - Voleybol Final', '/uploads/gallery/2023/voleybol-final-2023.jpg', '2023', 40),
('14. İmam Hatip Spor Oyunları - Basketbol Maçı', '/uploads/gallery/2023/basketbol-maci-2023.jpg', '2023', 35),
('13. İmam Hatip Spor Oyunları - Futbol Turnuvası', '/uploads/gallery/2022/futbol-turnuvasi-2022.jpg', '2022', 38),
('13. İmam Hatip Spor Oyunları - Voleybol Maçı', '/uploads/gallery/2022/voleybol-maci-2022.jpg', '2022', 33),
('12. İmam Hatip Spor Oyunları - Açılış Töreni', '/uploads/gallery/2021/acilis-toreni-2021.jpg', '2021', 36),
('12. İmam Hatip Spor Oyunları - Ödül Töreni', '/uploads/gallery/2021/odul-toreni-2021.jpg', '2021', 29);