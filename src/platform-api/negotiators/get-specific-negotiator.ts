import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import Axios from '../../axios'
import { URLS } from '../../constants/api'

type GetSpecificNegotiatorProps = {
  id: string | undefined
}

const fetchGetSpecificNegotiator = async (props: GetSpecificNegotiatorProps) => {
  const { data } = await Axios.get<NegotiatorModel>(`${URLS.NEGOTIATORS}/${props.id}`)
  return data
}

const useGetSpecificNegotiator = (props: GetSpecificNegotiatorProps) => {
  return useQuery(['Get Specific Negotiator ID', props.id], () => fetchGetSpecificNegotiator(props), {
    enabled: !!props.id,
  })
}

export default useGetSpecificNegotiator
