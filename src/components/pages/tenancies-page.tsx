import React from 'react'
import { FormLayout, InputWrap, Label, Loader, PageContainer, Select } from '@reapit/elements'
import { FetchGetTenanciesProps, useFetchGetTenancies } from '../../platform-api/tenancies-page/get-tenancies'
import RenderedTenanciesPage from '../ui/tenancies-page'

const generateStatusOption = () => [
  {
    index: 0,
    name: undefined,
    label: 'Select All',
  },
  {
    index: 1,
    name: 'offerPending',
    label: 'Offer Pending',
  },
  {
    index: 2,
    name: 'offerWithdrawn',
    label: 'Offer Withdrawn',
  },
  {
    index: 3,
    name: 'offerRejected',
    label: 'Offer Rejected',
  },
  {
    index: 4,
    name: 'arranging',
    label: 'Arranging',
  },
  {
    index: 5,
    name: 'current',
    label: 'Current',
  },
  {
    index: 6,
    name: 'finished',
    label: 'Finished',
  },
  {
    index: 7,
    name: 'cancelled',
    label: 'Cancelled',
  },
]

const TenanciesPage = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [indexCell, setIndexCell] = React.useState<number | null>(null)
  const [statusParams, setStatusParams] = React.useState<FetchGetTenanciesProps['status']>(undefined)

  const handleIndexCell = React.useCallback(setIndexCell, [])
  const handlePagination = React.useCallback(setCurrentPage, [])
  const handleStatusOnChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setStatusParams(undefined)
    } else {
      setStatusParams(e.target.value as FetchGetTenanciesProps['status'])
    }
    setIndexCell(null)
    setCurrentPage(1)
  }, [])

  const { data, isFetched } = useFetchGetTenancies({ page: currentPage, status: statusParams })

  const renderResult = () => {
    if (isFetched && !!data)
      return (
        <RenderedTenanciesPage
          data={data}
          cellIndexHandler={{ handleIndexCell, indexCell }}
          paginationHandler={{ handlePagination, currentPage }}
        />
      )

    return <Loader fullPage label="Please wait..." />
  }

  return (
    <PageContainer>
      <FormLayout>
        <InputWrap>
          <Label>Status</Label>
          <Select onChange={(e) => handleStatusOnChange(e)}>
            {generateStatusOption().map((data) => (
              <option key={data.index} value={data.name} label={data.label} />
            ))}
          </Select>
        </InputWrap>
        <InputWrap>
          <Label>Rent Frequency</Label>
        </InputWrap>
      </FormLayout>
      {renderResult()}
    </PageContainer>
  )
}

export default TenanciesPage
