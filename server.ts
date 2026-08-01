import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

interface LeadData {
  id: string;
  name: string;
  mobile: string;
  email: string;
  submittedAt: string;
  recipientEmail: string;
}

// In-memory lead store for preview runtime
const leadsDatabase: LeadData[] = [];
const RECIPIENT_EMAIL = "mchatterjee69@gmail.com";

// API Endpoint to receive user name, mobile no & email id for Welcome Kit
app.post("/api/lead", (req, res) => {
  try {
    const { name, mobile, email } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({
        success: false,
        error: "Name, Mobile Number, and Email ID are required.",
      });
    }

    const newLead: LeadData = {
      id: "lead_" + Date.now(),
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim(),
      submittedAt: new Date().toISOString(),
      recipientEmail: RECIPIENT_EMAIL,
    };

    leadsDatabase.push(newLead);

    console.log(`[Lead Captured] Sent to ${RECIPIENT_EMAIL}:`, newLead);

    return res.json({
      success: true,
      message: `Welcome Kit access registered successfully! Lead details logged for ${RECIPIENT_EMAIL}`,
      lead: newLead,
      recipient: RECIPIENT_EMAIL,
    });
  } catch (err) {
    console.error("Error processing lead:", err);
    return res.status(500).json({ success: false, error: "Failed to submit registration data." });
  }
});

// Endpoint to retrieve logged leads (for admin/debug view if needed)
app.get("/api/leads", (_req, res) => {
  res.json({
    recipient: RECIPIENT_EMAIL,
    total: leadsDatabase.length,
    leads: leadsDatabase,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
