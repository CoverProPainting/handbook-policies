const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'cover_pro_handbook_session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Password
const HANDBOOK_PASSWORD = process.env.HANDBOOK_PASSWORD || 'CP-Handbook-2026!';

// Auth middleware
const authRequired = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect('/login');
};

// Routes
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === HANDBOOK_PASSWORD) {
    req.session.authenticated = true;
    res.redirect('/policies');
  } else {
    res.render('login', { error: 'Invalid password. Please try again.' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/policies', authRequired, (req, res) => {
  res.render('policies-index');
});

// Import policy routes
const policyRoutes = require('./routes/policies');
app.use('/policy', authRequired, policyRoutes);

// Redirect root to login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Cover Pro Painting Handbook & Policies`);
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ Access at http://localhost:${PORT}/login`);
  console.log(`\n📝 Password: ${HANDBOOK_PASSWORD}`);
  console.log(`📧 Responses sent to: ${process.env.EMAIL_TO || 'info@coverpropainting.com'}\n`);
});
