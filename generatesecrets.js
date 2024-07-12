const fs = require('fs');
const crypto = require('crypto');


const jwtSecret = crypto.randomBytes(32).toString('hex');


const envContent = `JWT_SECRET=${jwtSecret}\nJWT_EXPIRES_IN=1h\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=your_database_name\nDB_USER=your_database_user\nDB_PASSWORD=your_database_password\n`;

fs.writeFileSync('.env', envContent, { encoding: 'utf8', flag: 'w' });

console.log('Secrets have been generated and stored in .env');
