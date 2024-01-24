const express = require('express');
const app = express()

//用于解析json请求体
app.use(express.json())

//设置端口
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
