import React from 'react';
import styles from './Footer.module.css';
import author from '../../assets/a3a2c077846f728918849cf9b781b8b.jpg'
import subscribe from '../../assets/b79f6e3270f3d5c24aa12717b4df450.jpg'
import github from '../../assets/cf8e05135877922226ec754e1b62819.png'




// const Footer1 = () => {
//     return (
//         <footer className={styles.footer}>
//             <div className={styles.content}>
//                 <span>© 2024 Comprehensive Input. All rights reserved.</span>
//                 <span>开源网站</span>
//                 <div className={styles.links}>
//                     <a href="https://github.com/katyjohn124?tab=repositories" target="_blank" rel="noopener noreferrer">
//                         <img src={github} alt="GitHub" />
//                     </a>
//                     <a href="mailto:your-email@example.com">2684876382@qq.com</a>
//                     <div className={styles.qrCode}>
//                         <img src={subscribe} alt="WeChat QR Code" />
//                         <span>微信公众号</span>
//                     </div>
//                     <div className={styles.qrCode}>
//                         <img src={author} alt="Personal WeChat QR Code" />
//                         <span>微信</span>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }



const Footer = () => {
    return (
        <footer className={styles.footer}>

            <div className={styles.contact}>
                GitHub<a href="https://github.com/katyjohn124?tab=repositories" target="_blank" rel="noopener noreferrer">
                    <img src={github} alt="GitHub" />
                </a>
                公众号<img src={subscribe} alt="WeChat QR Code" />
                微信<img src={author} alt="Personal WeChat QR Code" />
                邮箱<span>2684876382@qq.com</span>
            </div>
            <div className={styles.rightText}>
                <span>© 2024 Comprehensive Input. All rights reserved.</span>
                <span>开源网站</span>
            </div>
        </footer>
    )
}

export default Footer;

