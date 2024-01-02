import React from 'react'

import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    TwitterIcon,
    TwitterShareButton,
    InstapaperShareButton,
    InstapaperIcon
  } from 'react-share';
  
import "./css/form-details.css"
import { BgTimes } from 'utills/svgs/BgTimes';
export const ShareModal = ({url, title, shareForm}) => {

  const handleShareForm = () => {
    shareForm(null)
  }
  return (
    <div className="share-modal shadow-md ">
      <div className="flex justify-end items-center cursor-pointer" onClick={handleShareForm}>   <BgTimes /></div>
    <div
       
      >
        <h1 className="share-text">Share this form to social media plateforms</h1>
          <hr className="my-2" />
        <div className="flex gap-5 items-center justify-center">
        <FacebookShareButton
          url={url}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={url}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={url}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <InstapaperShareButton
          url={url}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <InstapaperIcon size={40} round={true} />
        </InstapaperShareButton>
        </div>
      </div>

  </div>
  )
}
