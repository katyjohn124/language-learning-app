
import React from 'react';
import PersonalProgressStory from './PersonalProgressStory';
import ShadowReadingWithYouTube from './ShadowReadingWithYouTube';
import AIToolsAndTutoringPlatforms from './AIToolsAndTutoringPlatforms';
import styles from './Speaking.module.css'

const Speaking = () => {

    const personalStory = "当我在YouTube练习听力三个月后，发现自己听力真的好了很多，但口语还是很蹩脚。我存在的问题就是羞于表达、与外国人交流时很紧张、然后句子结构颠倒、以及想表达一些事时想不到具体词来说（但是别人说出来时，自己又知道啥意思）。后来我觉得这样不行，于是就开始练习影子跟读，其方法我在下面列出来了；同时我还利用chatgpt来练习口语，但是它有一个问题，回复太多了一点都不像自然交谈；最后我是在口语外教平台上每天与外教练习free talk。我觉得大多数人还是有一定的英语能力的，只是面对外国人时过于紧张以至于脑袋空空，以及平时不在生活中把积累的词组说出来就会导致别人说你能听懂，让你自己讲又不会讲。当我在与外教free talk一个月后，我的口语水平得到了质的飞跃，因为我已经大量输入自然母语者的视频了，当自己再去输出的时候就会唤起那些储存在我脑海里的句子和表达，而且每节外教课结束后，我会拿一小时的时间去观看录频和反馈自己的表现——面部表情、回答严重错误的地方等等，然后自己边听对话边再重新回答一下问题。";
    const shadowReadingIntro = "影子跟读跟着这个视频方法去练就好，至于找不到合适的跟读资源去练的话——想练习英音就去油管搜索BBC learning English，这个频道有六分钟的系列，跟读练就行；想练习美音就用油管上的生活vlog博主的视频来练习（记住要拿语速慢一点的）。";
    const aiToolsDescription = "以下是一些AI工具和口语外教平台推荐...";
    const toolsList = ["1.ChatGPT——语言大模型鼻祖，使用它来改作文和英文日记很有用，毕竟写作和口语只差一步之遥，都属于输出一类；同时嫌口语外教课太贵的友友可以用GPT3.5来练简单的交流，有雅思备考需求的友友则需要升级plus用户，使用拿雅思口语题库训练过的GPT。使用方法就是学会阻止好语言逻辑再去询问，把问题的逻辑理清后，发给它，再让它回复出详细的步骤。例如，你好，我刚刚写完雅思作文，以下是我的作文...，请你帮我列出语言错误的地方，然后分别用简单句型和高级句型来重新写一遍...", "2.Gemini Ultra——谷歌旗下的大模型，据说2024年2月7日会正式发布，有实时视频功能，很期待。如果是我会拿来用在模拟英文面试，以及校准发音和张嘴程度，它实时的反馈其实挺有用。"];
    const platformsList = ["1.cambly——推荐理由：cambly是欧美英语口语外教平台，上面的大部分外教水平都挺好的，有教师证和相关工作经历。它能让你大胆开口表达自己，也可以自由选择教学模式（free talk还是跟着课程学、是在语法严重错误的情况下才纠正还是每个点都纠正），最重要的是上面还有前雅思考官。缺点就是太贵，预算不足的友友可以只尝试一下7.9元体验课测试一下自己口语水平如何就好。", "2.某宝菲教——推荐理由①很便宜，一节课三十分钟十几块还是30？忘记了...②虽然人家是菲教，但是英语也流利，适合那种预算不够的友友以及口语和听力比较差的人拿来过渡练习，因为他们发音以及教学水平肯定没有欧美母语者的水平好。"];
    return (
        <div className={styles.speakContainer}>
            <PersonalProgressStory story={personalStory} />
            <ShadowReadingWithYouTube intro={shadowReadingIntro} videoId="GVWFGIyNswI" />
            <AIToolsAndTutoringPlatforms
                description={aiToolsDescription}
                tools={toolsList}
                platforms={platformsList}
            />
        </div>
    );
};

export default Speaking;
