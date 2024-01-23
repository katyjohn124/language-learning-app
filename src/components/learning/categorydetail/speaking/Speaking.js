import React from 'react'
import AItools from './AItools'
import ShadowVideos from './ShadowVideos'
import TutorialPlatform from './TutorialPlatform'
import './speaking.css'


const Speaking = () => {
    return (
        <div className='speaking-container'>
            <section className='shadow-section'>
                <ShadowVideos />
            </section>
            <section className='AItools-section'>
                <AItools />
            </section>
            <section className='platform-section'>
                <TutorialPlatform />
            </section>
        </div>
    )
}

export default Speaking