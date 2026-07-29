-- Run once against the DB configured in .env.local (DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD).
-- Backs src/lib/sync-user.ts, called from src/app/api/webhooks/clerk/route.ts.

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  image_url VARCHAR(2048),
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
