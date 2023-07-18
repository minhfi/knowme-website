import { IconFB, IconInstagram, IconLinkedin, IconTwitter } from 'src/icons'
import Style from './style.module.scss'

export function Footer() {
  return (
    <div className={Style.footer}>
      <div className={Style.background}>
        <div className={Style.policy}>
          <div className={Style.policyList}>
            <a href="https://www.knowmebest.com/contact-us">Contact Us</a>
            <a href="https://www.knowmebest.com/privacy-policy">Privacy</a>
            <a href="https://www.knowmebest.com/terms-of-service-old">Terms</a>
            <a>Cookie Preferences</a>
            <a href="https://affiliates.knowmejobs.com">Affiliate program</a>
            <a href="https://www.knowmebest.com/blog">Blog</a>
          </div>
          <div className={Style.policyCopyright}>©2023 Know Me company. All rights reserved. Various trademarks held by their respective owners.</div>
        </div>
        <div className={Style.social}>
          <div>Get in touch</div>
          <div>
            <a href="https://www.facebook.com/knowmebest"><IconFB/></a>
            <a href="https://www.twitter.com/knowmebest"><IconTwitter/></a>
            <a href="https://www.linkedin.com/company/knowmebest"><IconLinkedin/></a>
            <a href="https://www.instagram.com/the_knowme"><IconInstagram/></a>
          </div>
        </div>
      </div>
    </div>
  )
}
