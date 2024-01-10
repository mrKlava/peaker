import { useQuery } from '@tanstack/react-query'
import { Map, MapAside } from '../../components'
import { MapContext, MapContextProvider } from '../../context/mapContext'
import { httpRequest } from '../../axios'
import { Loading } from '../../UI'

import './explore-page.scss'
import { useContext, useEffect } from 'react'


function ExplorePage() {

  const {setDestinations} = useContext(MapContext)

  const { status, isLoading, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["locations"],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/map/locations")

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  useEffect(() => {
    if (status === "success") setDestinations(data)
  }, [status])

  return (
    <MapContextProvider>
      <div className="explore">
        {status !== "success"
          ? <Loading />
          : <main className="explore-main">
            <MapAside />
            {/* <Map /> */}
            <Map locations={data}/>
          </main>
        }
      </div>
    </MapContextProvider>
  )
}

export default ExplorePage