// src/routes/tournamentRoutes.js
const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

// Auth Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: 'Yetkisiz erişim' });
};

// Herkese açık rotalar
router.get('/tournaments', tournamentController.getAllTournaments);
router.get('/tournaments/:id/matches', tournamentController.getTournamentMatches);

// Admin rotaları
router.post('/tournaments', isAuthenticated, tournamentController.createTournament);
router.get('/tournaments/:id/stages', isAuthenticated, tournamentController.getTournamentStages);
router.post('/tournaments/:id/stages', isAuthenticated, tournamentController.createStage);
router.get('/stages/:stageId/matches', isAuthenticated, tournamentController.getStageMatches);
router.post('/stages/:stageId/matches', isAuthenticated, tournamentController.createMatch);
router.put('/matches/:matchId/score', isAuthenticated, tournamentController.updateMatchScore);

module.exports = router;