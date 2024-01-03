import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserUpdate } from '../../components'
import { AuthContext } from '../../context/authContext'
import { Button, Card, Loading, Quantity, Text, TitleSection } from '../../UI'
import { httpRequest } from '../../axios'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

import './aside.scss'

function Aside({ user }) {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext)

  const [isUpdate, setIsUpdate] = useState(false)

  const userID = user.user_id


  const { isLoading: isLoadingFollowing, data: following } = useQuery({
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
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

  const handleEdit = () => {
    setIsUpdate(true)
    window.scrollTo(0, 0)
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
      {isUpdate && <UserUpdate setIsUpdate={setIsUpdate} user={user} />}


      <section className="aside-picture">
        <img src={`/assets/images/${user.user_img}`} alt="" />
      </section>
      {
        isLoadingFollowers || isLoadingFollowing
          ? <Loading />
          : <section className='aside-social'>
            <div className='aside-social_stats'>
              <div>
                <Link to={`/users?followers=${user.user_id}`}><span>Followers</span>: <Quantity number={followers.length} /></Link>
              </div>
              <div>
                <Link to={`/users?following=${user.user_id}`}><span>Following</span>: <Quantity number={following.length} /></Link>
              </div>
            </div>

            {
              user.user_id === currentUser.user_id
                ? <Button onClick={handleEdit}>Edit</Button>
                : followers.includes(currentUser.user_id)
                  ? <Button onClick={handleFollow}>Following</Button>
                  : <Button onClick={handleFollow}>Follow</Button>
            }
          </section>
      }




      <Card className='aside-bio'>
        <TitleSection className="aside-bio_name">{user.firstname} {user.middlename} {user.lastname}</TitleSection>
        <h3 className="aside-bio_username">@{user.username}</h3>

        {
          user.location &&
          <div className="aside-bio_location">
            <IconLocation />
            {user.location}
          </div>
        }
        {
          user.bio &&
          <div className="aside-bio_bio">
            <TitleSection className="aside-bio_title">Bio</TitleSection>
            <Text className="aside-bio_text">{user.bio}</Text>
          </div>
        }
      </Card>

      <Card className='aside-locations' light={true}>
        <TitleSection>Locations</TitleSection>
      </Card>


    </aside>
  )
}

export default Aside