import React from 'react'

import { Avatar } from '../../UI'
import { ReactComponent as IconLike } from '../../assets/images/icons/IconLike.svg'
import { ReactComponent as IconComment } from '../../assets/images/icons/IconComment.svg'
import { ReactComponent as IconShare } from '../../assets/images/icons/IconShare.svg'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'

import './post.scss'

function Post({ post }) {
  return (
    <article className="post">
      <div className="post-head">
        <Avatar img={post.author_img} />
        <div className="post-head_stamp">
          <span>{ post.author }</span>
          <span>{ post.created } { post.location ? `- ${post.location}` : null} </span>
        </div>
      </div>
      <div className="post-body">
        {post.text}
        {
        post.img 
        ? ( 
        <div className="post-images">
          { post.img.map((img, index) => {
            return <div key={index} className="post-images_image"><img src={`./assets/images/${img}`} alt="" /></div>
          })}
        </div>
        ) : null
      }
      </div>
      <div className="post-footer">
        <ul className="post-footer_actions">
          <li className="post-footer_action">
            <button><IconLike /></button>
            <span>{ post.likes }</span>
          </li>
          <li className="post-footer_action">
            <button><IconShare /></button>
            <span>{ post.shares }</span>
          </li>
          <li className="post-footer_action">
            <button><IconComment /></button>
            <span>{ post.comments}</span>
          </li>
        </ul>
        <div className="post-footer_comment">
          <input type="text" placeholder="What do you think? ..."/>
          <button><IconSend /></button>
        </div>
      </div>
    </article>
  )
}

export default Post