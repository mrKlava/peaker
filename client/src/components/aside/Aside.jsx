import React, { useContext, useEffect } from 'react'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

import './aside.scss'
import { AuthContext } from '../../context/authContext'
import { Button } from '../../UI'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'

function Aside({ userID = null }) {
  const { currentUser } = useContext(AuthContext)
  const queryClient = useQueryClient()


  userID = userID ? userID : currentUser.user_id

  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/find/" + userID)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const { isLoading: isLoadingFollowing, data: following } = useQuery({
    queryKey: ['following', userID],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/follow?userID=" + userID)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const { isLoading: isLoadingFollowers, data: followers } = useQuery({
    queryKey: ['followers', userID],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/follow/me?userID=" + userID)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })


  const mutationFollow = useMutation({
    mutationFn: async (isFollowed) => {

      if (isFollowed) return await httpRequest.delete('/follow?userID=' + userID)
      return await httpRequest.post('/follow', { userID })
    },
    onSuccess: () => {
      console.log('success')
      QueryClient.invalidateQueries(["followers"])
      console.log(followers)
    }
  })


  const handleFollow = () => {

    mutationFollow.mutate(followers.includes(currentUser.user_id))
  }

  const handleFollowers = () => {
    console.log('clicked followers')
  }

  const handleFollowing = () => {
    console.log('clicked following')
  }


  const handleEdit = () => {

  }

  useEffect(() => {
    console.log(followers)
  }, [followers])

  return (
    <aside className='aside'>
      {
        isLoading
          ? <h1>Loading</h1>
          : <>
            <section className="aside-picture">
              <img src={`/assets/images/${data.user_img}`} alt="" />
            </section>
            {
              isLoadingFollowers || isLoadingFollowing
                ? 'Loading...'
                : <section className='aside-social'>
                  <div className='aside-social_stats'>
                    <div onClick={handleFollowers}><span>Followers</span>: {followers.length}</div>
                    <div onClick={handleFollowing}><span>Following</span>: {following.length}</div>
                  </div>

                  {
                    data.user_id === currentUser.user_id
                    ? <Button onClick={handleEdit}>Edit</Button>
                    : followers.includes(currentUser.user_id)
                      ? <Button onClick={handleFollow}>Following</Button>
                      : <Button onClick={handleFollow}>Follow</Button>
                  }

                </section>
            }

            <section className='aside-bio'>
              <h2 className="aside-bio_name">{data.firstname} {data.lastname}</h2>
              <div className="aside-bio_location">
                <IconLocation />
                {data.city} - {data.country}
              </div>
              <div className="aside-bio_bio">
                <h3>Bio</h3>
                <p>
                  {data.bio}
                </p>
              </div>
            </section>

            <section className='aside-locations'>
              <h3>Locations</h3>
            </section>
          </>
      }

    </aside>
  )
}

export default Aside