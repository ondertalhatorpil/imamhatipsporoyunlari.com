// src/controllers/tournamentController.js
const { pool } = require('../config/db');

// Tüm turnuvaları listele
exports.getAllTournaments = async (req, res) => {
    try {
      const [tournaments] = await pool.query('SELECT * FROM tournaments ORDER BY id DESC');
      res.json(tournaments);
    } catch (error) {
      console.error('Turnuvalar alınırken hata:', error);
      res.status(500).json({ error: 'Turnuvalar alınırken bir hata oluştu' });
    }
  };

// Yeni turnuva oluştur
exports.createTournament = async (req, res) => {
  const { name, sport_type } = req.body;
  
  if (!name || !sport_type) {
    return res.status(400).json({ error: 'Turnuva adı ve spor türü gereklidir' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO tournaments (name, sport_type) VALUES (?, ?)',
      [name, sport_type]
    );
    
    res.status(201).json({ 
      id: result.insertId,
      name,
      sport_type,
      message: 'Turnuva başarıyla oluşturuldu' 
    });
  } catch (error) {
    console.error('Turnuva oluşturulurken hata:', error);
    res.status(500).json({ error: 'Turnuva oluşturulurken bir hata oluştu' });
  }
};

// Turnuvanın aşamalarını listele
exports.getTournamentStages = async (req, res) => {
  const tournamentId = req.params.id;
  
  try {
    const [stages] = await pool.query(
      'SELECT * FROM stages WHERE tournament_id = ? ORDER BY order_num',
      [tournamentId]
    );
    
    res.json(stages);
  } catch (error) {
    console.error('Turnuva aşamaları alınırken hata:', error);
    res.status(500).json({ error: 'Turnuva aşamaları alınırken bir hata oluştu' });
  }
};

// Yeni aşama oluştur
exports.createStage = async (req, res) => {
  const tournamentId = req.params.id;
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Aşama adı gereklidir' });
  }
  
  try {
    // Mevcut en yüksek sıra numarasını bul
    const [orderResult] = await pool.query(
      'SELECT MAX(order_num) as max_order FROM stages WHERE tournament_id = ?',
      [tournamentId]
    );
    
    const nextOrder = orderResult[0].max_order ? orderResult[0].max_order + 1 : 1;
    
    const [result] = await pool.query(
      'INSERT INTO stages (tournament_id, name, order_num) VALUES (?, ?, ?)',
      [tournamentId, name, nextOrder]
    );
    
    res.status(201).json({
      id: result.insertId,
      tournament_id: tournamentId,
      name,
      order_num: nextOrder,
      message: 'Aşama başarıyla oluşturuldu'
    });
  } catch (error) {
    console.error('Aşama oluşturulurken hata:', error);
    res.status(500).json({ error: 'Aşama oluşturulurken bir hata oluştu' });
  }
};

// Aşamadaki maçları listele
exports.getStageMatches = async (req, res) => {
  const stageId = req.params.stageId;
  
  try {
    const [matches] = await pool.query(
      'SELECT * FROM matches WHERE stage_id = ? ORDER BY match_time',
      [stageId]
    );
    
    res.json(matches);
  } catch (error) {
    console.error('Maçlar alınırken hata:', error);
    res.status(500).json({ error: 'Maçlar alınırken bir hata oluştu' });
  }
};

// Yeni maç oluştur
exports.createMatch = async (req, res) => {
  const stageId = req.params.stageId;
  const { team1_name, team2_name, match_time } = req.body;
  
  if (!team1_name || !team2_name || !match_time) {
    return res.status(400).json({ error: 'Takım isimleri ve maç zamanı gereklidir' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO matches (stage_id, team1_name, team2_name, match_time) VALUES (?, ?, ?, ?)',
      [stageId, team1_name, team2_name, new Date(match_time)]
    );
    
    res.status(201).json({
      id: result.insertId,
      stage_id: stageId,
      team1_name,
      team2_name,
      match_time,
      message: 'Maç başarıyla oluşturuldu'
    });
  } catch (error) {
    console.error('Maç oluşturulurken hata:', error);
    res.status(500).json({ error: 'Maç oluşturulurken bir hata oluştu' });
  }
};

// Maç sonucunu güncelle
exports.updateMatchScore = async (req, res) => {
  const matchId = req.params.matchId;
  const { team1_score, team2_score } = req.body;
  
  if (team1_score === undefined || team2_score === undefined) {
    return res.status(400).json({ error: 'Her iki takım için de skor gereklidir' });
  }
  
  try {
    await pool.query(
      'UPDATE matches SET team1_score = ?, team2_score = ?, is_finished = TRUE WHERE id = ?',
      [team1_score, team2_score, matchId]
    );
    
    res.json({ message: 'Maç sonucu başarıyla güncellendi' });
  } catch (error) {
    console.error('Maç sonucu güncellenirken hata:', error);
    res.status(500).json({ error: 'Maç sonucu güncellenirken bir hata oluştu' });
  }
};

// Turnuvanın tüm maçlarını getir (kullanıcı görünümü için)
exports.getTournamentMatches = async (req, res) => {
  const tournamentId = req.params.id;
  
  try {
    const [result] = await pool.query(`
      SELECT s.name as stage_name, s.order_num, s.id as stage_id,
             m.id, m.team1_name, m.team2_name, m.match_time, 
             m.team1_score, m.team2_score, m.is_finished
      FROM stages s
      JOIN matches m ON s.id = m.stage_id
      WHERE s.tournament_id = ?
      ORDER BY s.order_num, m.match_time
    `, [tournamentId]);
    
    // Aşamalara göre gruplandır
    const groupedMatches = {};
    result.forEach(row => {
      if (!groupedMatches[row.stage_name]) {
        groupedMatches[row.stage_name] = {
          stage_id: row.stage_id,
          order_num: row.order_num,
          matches: []
        };
      }
      
      groupedMatches[row.stage_name].matches.push({
        id: row.id,
        team1_name: row.team1_name,
        team2_name: row.team2_name,
        match_time: row.match_time,
        team1_score: row.team1_score,
        team2_score: row.team2_score,
        is_finished: row.is_finished
      });
    });
    
    res.json(groupedMatches);
  } catch (error) {
    console.error('Turnuva maçları alınırken hata:', error);
    res.status(500).json({ error: 'Turnuva maçları alınırken bir hata oluştu' });
  }
};