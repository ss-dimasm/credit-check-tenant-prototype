import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import Axios from '../../axios'
import { URLS } from '../../constants/api'

type GetSpecificPropertyProps = {
  id: string | undefined
}

const fetchGetSpecificProperty = async ({ id }: GetSpecificPropertyProps) => {
  const { data } = await Axios.get<PropertyModel>(`${URLS.PROPERTIES}/${id}`)
  return data
}

const useGetSpecificProperty = (props: GetSpecificPropertyProps) => {
  return useQuery(['Get Specific Property ID', props.id], () => fetchGetSpecificProperty(props), {
    enabled: !!props.id,
  })
}

export default useGetSpecificProperty
