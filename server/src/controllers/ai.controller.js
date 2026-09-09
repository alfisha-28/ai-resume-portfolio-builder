// AI Controller
// Provider-agnostic. Set GEMINI_API_KEY or OPENAI_API_KEY in .env to enable.
// Until then every endpoint returns 503 with a clear message.

const AI_CONFIGURED = !!(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY);

function notConfigured(res) {
  return res.status(503).json({
    success: false,
    message: "AI features are not configured. Set GEMINI_API_KEY or OPENAI_API_KEY in server .env.",
  });
}

// POST /api/v1/ai/summary
async function generateSummary(req, res) {
  if (!AI_CONFIGURED) return notConfigured(res);
  // TODO: call Gemini/OpenAI with req.body
  return res.json({ success: true, data: { text: "" } });
}

// POST /api/v1/ai/improve-experience
async function improveExperience(req, res) {
  if (!AI_CONFIGURED) return notConfigured(res);
  return res.json({ success: true, data: { text: "" } });
}

// POST /api/v1/ai/improve-project
async function improveProject(req, res) {
  if (!AI_CONFIGURED) return notConfigured(res);
  return res.json({ success: true, data: { text: "" } });
}

// POST /api/v1/ai/review/:resumeId
async function reviewResume(req, res) {
  if (!AI_CONFIGURED) return notConfigured(res);
  return res.json({ success: true, data: { score: 0, suggestions: [] } });
}

// POST /api/v1/ai/ats-score/:resumeId
async function calculateATSScore(req, res) {
  if (!AI_CONFIGURED) return notConfigured(res);
  return res.json({ success: true, data: { score: 0 } });
}

module.exports = { generateSummary, improveExperience, improveProject, reviewResume, calculateATSScore };
