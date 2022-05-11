import { TenancyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useQuery } from 'react-query'
import Axios from '../../axios'
import { URLS } from '../../constants/api'

export type FetchGetTenanciesProps = {
  page: number
  status?: 'offerPending' | 'offerWithdrawn' | 'offerRejected' | 'arranging' | 'current' | 'finished' | 'cancelled'
}

const fetchGetTenancies = async ({ page, status }: FetchGetTenanciesProps) => {
  const { data } = await Axios.get<TenancyModelPagedResult>(URLS.TENANCIES, {
    params: {
      pageNumber: page,
      status: status,
    },
  })
  return data
}

export const useFetchGetTenancies = (props: Omit<FetchGetTenanciesProps, 'connectSession'>) => {
  return useQuery(['Fetch Tenancies', props], () => fetchGetTenancies(props))
}
