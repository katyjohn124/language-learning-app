import React from 'react'
import { Link } from 'react-router-dom'

//模拟数据
const categories = [
    { name: '听力', path: '/learningcategory/listening/Listening' },
    { name: '阅读', path: '/learning/listening/' },
    { name: '口语', path: '/learningcategory/speaking' },
    { name: '写作', path: '/learningcategory/writing' }
]

const LearningCategory = () => {
    return (
        <div>
            <h1>学习类别</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.name}>
                        <Link to={category.path}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LearningCategory