import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, InputSelect, InputText, TitleSection } from '../../UI'
import { httpRequest } from '../../axios'

import './users-filter.scss'

function UsersFilter({setSearchParams}) {
  const [inputs, setInputs] = useState({search: '', country_id: '', city_id: ''})

  /* Fetch Data */

  // countries
  const { isLoading: isLoadingCountries, data: countries } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['countries'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/countries")

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  // cities
  const { isLoading: isLoadingCities, data: cities } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['cities'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/cities")

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })
  
  /* Handle inputs */

  // handle input change - controlled inputs
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // handle submit of filters -> updated search queries
  const handleClick = () => {
    const params = {}
    for (const [key, value] of Object.entries(inputs)) {
      if (value) params[key] = value
    }

    setSearchParams(params)
  }

  return (
    <Card className="users-filter">
      <TitleSection className="users-filter_title">Find People</TitleSection>

      <div className="form-row">
        <InputText
          label="Search"
          name="search"
          placeholder="Find by name, surname ..."
          onChange={handleChange}
          value={inputs.search}
        />
        <InputSelect
          name="country_id"
          label="Country"
          onChange={handleChange}
          value={inputs.country_id ? inputs.country_id : ''}
        >
          <option value="" default>Select country</option>
          {
            isLoadingCountries
              ? null
              : countries.map((country) => <option key={country.country_id} value={country.country_id}>{country.name}</option>)
          }
        </InputSelect>
        <InputSelect
          name="city_id"
          label="City"
          onChange={handleChange}
          value={inputs.city_id ? inputs.city_id : ''}

        >
          <option value="" default>Select city</option>
          {
            isLoadingCities
              ? null
              : cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.name}</option>)
          }
        </InputSelect>
        <Button onClick={handleClick}>Search</Button>
      </div>

    </Card>
  )
}

export default UsersFilter