const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const authRoutes = require('./src/routes/authRoutes'); // 确保路径正确


app.use(cors());
app.use(express.json());
app.use('/api', authRoutes); // 这里设置了路由前缀 `/api`

const communityRoutes = require('./src/routes/communityRoutes');

app.use(cors())
//用于解析json请求体
app.use(express.json())
// 将用户相关的路由挂载到/api路径下
app.use('/api', userRoutes);
app.use('/api/community', communityRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
