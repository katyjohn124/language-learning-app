import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LearningCategory.module.css'

//模拟数据
const categories = [
    { name: '听力（点击这里即可进入）', path: '/learningcategory/listening', description: '该部分将会介绍使用Youtube来练习听力的方法，以及实施的前提条件和准备工具。比如安装哪些插件能实时翻译youtube字幕中的陌生单词，前期是开英文字幕看还是关着看比较好？' },
    {
        name: '阅读（可到社区去看分享贴）', description: '事先说明：阅读部分的练习大家自行发挥即可，因为国人英语考试中阅读能力是最强的，我之所以详细讲了听力和口语是因为在生活中，这两项最常用到。阅读资源相关查找可进一步到社区讨论区查看，或者直接搜索关键词即可。那接下来我就分享自己在日常生活中如何沉浸式地进行阅读训练。首先手机、电脑浏览器都设置为英语，浏览器翻译页面的功能给掐掉，这样让你被迫用英语去学习和生活每天如果所有事情都弄完了，闲得很的时候，我会去reddit上查看自己感兴趣的讨论，其中不妨就有雅思小组，里面来自世界各地的烤鸭，用英语娱乐消遣还能汲取备考经验。另外，我每天还强迫自己看三十分钟的新闻文章，可以是BBC、英国卫报、纽约时报等，每当自己看完一篇文章时，就会记下地道的表达和一些词组'
    },
    {
        name: '口语（点击这里即可进入）', path: '/learningcategory/speaking',
        description:
            '该部分将会介绍口语怎么练？推荐哪些外教平台，如何利用AI来练习雅思题库？例如：如果你不知道自己口语真实水平的话，去cambly欧美外教平台花7.9元体验课（使用我的推荐码——FLUENT24。即可能上45分钟的课程，7.9元是30分钟，加上我的推荐码后额外赠送15分钟）聊一下就知道了；一般上去听都不听懂的人先去把听力练好，大部分人能听懂只是不知道如何表达或者构造不出正确的句子、羞于表达不自信等等。'
    },
    { name: '写作（可到社区去看分享贴）', description: '我对这部分不是很有信心，建议提供不了，但是资料还是能搜集到的。我平时对写作的练习就是每天用英语写日记，然后强迫自己写完后拿给chatgpt去修改语法、句子结构错误；同时每当我看完油管视频时，会仔细看底下的评论，然后自己也用英语去评论。资源查找可以点击搜索输入 写作 关键词查找相关分享帖子！' }
]

const LearningCategory = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.category}>分类</h1>
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