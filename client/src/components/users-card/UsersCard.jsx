import { useContext } from 'react'
import { Author, Button, Card, Loading } from '../../UI'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { AuthContext } from '../../context/authContext'

import './users-card.scss'


function UsersCard({ user }) {
  const queryClient = useQueryClient()

  const { currentUser } = useContext(AuthContext)

  /* Get followers for user */

  const { isLoading: isLoadingFollowers, data: followers } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['followers', user.user_id],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/follow/ers?userID=" + user.user_id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })


  /* Handle follow */

  const mutationFollow = useMutation({
    refetchOnWindowFocus: false,
    mutationKey: ['followers'],
    mutationFn: async (isFollowed) => {

      if (isFollowed) return await httpRequest.delete('/follow?userID=' + user.user_id)
      return await httpRequest.post('/follow', { userID: user.user_id })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["followers"])
    }
  })

  const handleFollow = () => {
    mutationFollow.mutate(followers.includes(currentUser.user_id))
  }

  return (
    <Card className="users-card" light={true} article={true}>

      <div className="users-card_content">
        <Author author={user} />
      </div>

      <div className="users-card_social">
        {
          isLoadingFollowers
            ? <Loading />
            : followers &&
            <>
              <h4>Followers: {followers.length}</h4>
              {
                user.user_id === currentUser.user_id
                  ? null
                  : followers.includes(currentUser.user_id)
                    ? <Button onClick={handleFollow}>Following</Button>
                    : <Button onClick={handleFollow}>Follow</Button>
              }
            </>
        }
      </div>

    </Card>
  )
}

export default UsersCard