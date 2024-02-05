import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LearningCategory.module.css'

//模拟数据
const categories = [
    { name: '听力（点击这里即可进入）', path: '/learningcategory/listening', description: '该部分将会介绍使用Youtube来练习听力的方法，以及实施的前提条件和准备工具。比如安装哪些插件能实时翻译youtube字幕中的陌生单词，前期是开英文字幕看还是关着看比较好？' },
    { name: '阅读（点击这里即可进入', path: '/learningcategory/reading', description: '该部分将会介绍如何沉浸式把阅读放到生活当中，例如手机语言设置成目标语言、看英文新闻、小说，看宫斗剧的目标语言版本等等，没错当你开着字幕看影视也是对阅读的训练。' },
    {
        name: '口语（点击这里即可进入', path: '/learningcategory/speaking',
        description:
            '该部分将会介绍口语怎么练？推荐哪些外教平台，如何利用AI来练习雅思题库？例如：如果你不知道自己口语真实水平的话，去cambly欧美外教平台花7.9元体验课（使用我的推荐码——FLUENT24。即可能上45分钟的课程，7.9元是30分钟，加上我的推荐码后额外赠送15分钟）聊一下就知道了；一般上去听都不听懂的人先去把听力练好，大部分人能听懂只是不知道如何表达或者构造不出正确的句子、羞于表达不自信等等。'
    },
    { name: '写作', description: '我对这部分不是很有信心，建议提供不了，但是资料还是能搜集到的。我平时对写作的练习就是每天用英语写日记，然后强迫自己写完后拿给chatgpt去修改语法、句子结构错误；同时每当我看完油管视频时，会仔细看底下的评论，然后自己也用英语去评论。' }
]

const LearningCategory = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.category}>学习类别</h1>
            <ul className={styles.categoryList}>
                {categories.map((category) => (
                    <li key={category.name} className={styles.categoryItem}>
                        <Link to={category.path} className={styles.categoryLink}>
                            {category.name}
                        </Link>
                        <p className={styles.categoryDescription}>{category.description}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default LearningCategory