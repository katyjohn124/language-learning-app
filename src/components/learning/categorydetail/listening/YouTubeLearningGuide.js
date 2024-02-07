import React from 'react';
import ejoy from '../../../../assets/4ef9c078097e8049ce1027aee1efa55.png'
import translate from '../../../../assets/172ef0a2a5c59aa0c2047e6d69b5105.png'
import beginner from '../../../../assets/1c04bb0f1380b88757ed7015f3b4021.jpg'
import senior from '../../../../assets/e55e83d3d7ec87e1bae76fffab267f5.jpg'
const YouTubeLearningGuide = () => {
    return (
        <div className="youtube-learning-guide">
            <h2>二.如何使用YouTube学习英语</h2>
            <div className="guide-step">
                <h3>1. 安装谷歌浏览器插件</h3>
                <p>推荐使用Ejoy插件来翻译YouTube视频字幕，打开谷歌浏览器搜索“ejoy”插件，或者直接打开谷歌插件商店搜索“ejoy”，点击安装即可使用。然后可以打开YouTube刷新一下就会出现插件界面了，然后自己可以设置——当点击字幕时翻译成英语解释还是中文的解释</p>
                <img src={ejoy} alt='ejoy' />
                <img src={translate} alt='ejoy' />
            </div>
            <div className="guide-step">
                <h3>2. 听力练习方法</h3>
                <p>初学者可以从简单的视频开始，逐步增加难度。进阶学习者应该尝试看不带字幕的视频，并总结学到的新单词和短语。需要注意的一点是：一定要看自己感兴趣的视频，不然你就会分神，效率就会低很多。</p>
            </div>
            <div className="guide-step">
                <h3>3. 推荐的YouTube博主</h3>
                <ul>
                    <li>适合初学者(YouTube上的一些英语教学博主):
                        <img src={beginner} alt='ejoy' />
                    </li>
                    <li>适合初~中级过渡的学习者（YouTube上的一些生活vlog博主、挑战视频博主）:
                        Sydney Serena、Taylor Bell 、Kennedy Walsh、Steve Kaufmann - lingosteve等等，我之后会在社区讨论分享相关帖子！
                    </li>
                    <li>中高级学习者（新闻、Tedtalk、美妆等学习教程）:
                        <img src={senior} alt='ejoy' />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default YouTubeLearningGuide;
