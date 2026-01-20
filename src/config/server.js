require('dotenv').config();

const { createApp } = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected');

    const app = createApp(db);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  }
})();
