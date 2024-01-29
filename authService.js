const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const authRoutes = require('./src/routes/authRoutes'); // 确保路径正确

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes); // 这里设置了路由前缀 `/api`

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
