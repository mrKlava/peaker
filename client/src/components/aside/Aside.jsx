import { useContext, useEffect, useState } from 'react'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'
import { UserUpdate } from '../../components'
import { AuthContext } from '../../context/authContext'
import { Button, Card, Loading, Text, TitleSection } from '../../UI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'

import './aside.scss'

function Aside({ userID = null }) {
  const [isUpdate, setIsUpdate] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const queryClient = useQueryClient()


  userID = userID ? userID : currentUser.user_id

  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/find/" + userID)

        console.log(data)

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
        const resp = await httpRequest.get("/follow/ers?userID=" + userID)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutationFollow = useMutation({
    mutationKey: ['followers'],
    mutationFn: async (isFollowed) => {

      if (isFollowed) return await httpRequest.delete('/follow?userID=' + userID)
      return await httpRequest.post('/follow', { userID })
    },
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries(["followers"])
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
    setIsUpdate(true)
  }

  useEffect(() => {
    if (isUpdate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isUpdate])

  return (
    <aside className='aside'>
      { isUpdate && <UserUpdate setIsUpdate={setIsUpdate} user={data} /> }

      {
        isLoading
          ? <Loading />
          : <>
            <section className="aside-picture">
              <img src={`/assets/images/${data.user_img}`} alt="" />
            </section>
            {
              isLoadingFollowers || isLoadingFollowing
                ? <Loading />
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

            <Card className='aside-bio'>
              <TitleSection className="aside-bio_name">{data.firstname} {data.middlename} {data.lastname}</TitleSection>
              <h3 className="aside-bio_username">@{data.username}</h3>

              {
                data.location &&
                <div className="aside-bio_location">
                  <IconLocation />
                  {data.location}
                </div>
              }
              {
                data.bio &&
                <div className="aside-bio_bio">
                  <TitleSection className="aside-bio_title">Bio</TitleSection>
                  <Text className="aside-bio_text">{data.bio}</Text>
                </div>
              }
            </Card>

            <Card className='aside-locations' light={true}>
              <TitleSection>Location</TitleSection>
            </Card>
          </>
      }

    </aside>
  )
}

export default Aside