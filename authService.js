const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const authRoutes = require('./src/routes/authRoutes');
const communityRoutes = require('./src/routes/communityRoutes');
const chatgptRoutes = require('./src/routes/chatgptRoutes');

app.use(cors());
app.use(express.json());
// 这里设置了路由前缀 `/api`
app.use('/api', authRoutes);

app.use(cors())
//用于解析json请求体
app.use(express.json())
// 将用户相关的路由挂载到/api路径下
app.use('/api/community', communityRoutes);
app.use('/api/openai', chatgptRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
