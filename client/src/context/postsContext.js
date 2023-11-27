import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext()

export const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const generatePosts = () => {
    const arr = []
    const post = {
      id: 1,
      author: "Name Surname",
      author_img: "user-photo.jpg",
      created: "14:59 21/11/2023",
      location: "Pau, France",
      text: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues.",
      images: ['post-image-1.jpg', 'post-image-2.jpg', 'post-image-3.jpg'],
      likes: 12345,
      shares: 12345,
      comments: 12345
    }

    for (let i = 0; i < 100; i++) {
      arr.push({ ...post, id: i })
    }

    setPosts([...arr])
  }

  useEffect(() => {
    generatePosts()
  }, [])


  return (
    <PostsContext.Provider value={
      {
        posts, 
        setPosts
      }
    }>
      {children}
    </PostsContext.Provider>
  )
}