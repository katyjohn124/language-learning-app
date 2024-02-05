import React from 'react';

const TutoringPlatforms = () => {

    const platforms = [
        {
            id: 1,
            name: '1.cambly',
            description: '推荐理由：cambly是欧美英语口语外教平台，上面的大部分外教水平都挺好的，有教师证和相关工作经历。它能让你大胆开口表达自己，也可以自由选择教学模式（free talk还是跟着课程学、是在语法严重错误的情况下才纠正还是每个点都纠正），最重要的是上面还有前雅思考官。缺点就是太贵，预算不足的友友可以只尝试一下7.9元体验课测试一下自己口语水平如何就好。'
        },
        {
            id: 2,
            name: '2.某宝菲教',
            description: '推荐理由①很便宜，一节课三十分钟十几块还是30？忘记了...②虽然人家是菲教，但是英语也流利，适合那种预算不够的友友以及口语和听力比较差的人拿来过渡练习，因为他们发音以及教学水平肯定没有欧美母语者的水平好。'
        },
        {
            id: 3,
            name: '3.hello talk',
            description: '推荐理由是完全免费，它是一个语言交换的学习平台，你可以用中文去和目标语言的母语者进行交流，效果不知道好不好，但可以去尝试一下。'
        },


    ];

    return (
        <div className="tutoring-platforms">
            <h1>口语外教平台推荐</h1>
            {platforms.map(platform => (
                <div key={platform.id} className="platform">
                    <h3>{platform.name}</h3>
                    <p>{platform.description}</p>
                </div>
            ))}
        </div>
    );
};

export default TutoringPlatforms;
