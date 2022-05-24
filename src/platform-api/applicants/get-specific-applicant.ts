import { ApplicantModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import Axios from 'axios'
import { URLS } from '../../constants/api'

type FetchGetSpecificApplicant = {
  id: string | undefined
}

const fetchGetSpecificApplicant = async ({ id }): Promise<ApplicantModel> => {
  const { data } = await Axios.get<ApplicantModel>(`${URLS.APPLICANT}/${id}`)
  return data
}

const useGetSpecificApplicant = (props: FetchGetSpecificApplicant) => {
  return useQuery(['Specific Applicant ID', props.id], () => fetchGetSpecificApplicant(props), {
    enabled: props.id === '' || !!props.id,
  })
}

export default useGetSpecificApplicant
