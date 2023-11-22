import React from 'react'
import './feed-page.scss'
import { Post } from '../../components'

import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconSmile } from '../../assets/images/icons/IconSmile.svg'
import { ReactComponent as IconImage } from '../../assets/images/icons/IconImage.svg'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

function FeedPage() {
  const posts = []

  const post = {
    id: 1,
    author: "Name Surname",
    author_img: "user-photo.jpg",
    created: "21/11/2023",
    location: "Pau, France",
    text: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues.",
    img: ['post-image-1.jpg', 'post-image-2.jpg', 'post-image-3.jpg'],
    likes: 12345,
    shares: 12345,
    comments: 12345
  }

  for (let i = 0; i < 100; i++) {
    posts.push(i)
  }

  return (
    <main>
      <section className="post-new">
        <div className="post-new_body">
          <textarea name="" id=""></textarea>
        </div>
        <div className="post-new_footer">
          <ul className="post-footer_actions">
            <li className="post-footer_action">
              <button><IconSmile /></button>
            </li>
            <li className="post-footer_action">
              <button><IconImage /></button>
            </li>
            <li className="post-footer_action">
              <button><IconLocation /></button>
            </li>
          </ul>
          <button><IconSend /></button>
        </div>
      </section>
      <section className='post-feed'>
        {posts.map(i => <Post key={i} post={post} />)}
      </section>
    </main>
  )
}

export default FeedPage