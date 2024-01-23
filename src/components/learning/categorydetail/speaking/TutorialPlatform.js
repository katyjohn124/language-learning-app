import React from 'react';

const TutoringPlatforms = () => {
    // 假设的平台推荐数据
    const platforms = [
        {
            id: 1,
            name: '平台名称1',
            description: '推荐理由...'
        },
        // ...更多平台
    ];

    return (
        <div className="tutoring-platforms">
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
