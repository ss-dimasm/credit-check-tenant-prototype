import React from 'react'

import { TenancyModel, TenancyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Button, FlexContainer, Loader, Pagination, RowProps, Table, useModal } from '@reapit/elements'

import useGetSpecificApplicant from '../../../platform-api/applicants/get-specific-applicant'
import useGetSpecificProperty from '../../../platform-api/properties/get-specific-property'
import useGetSpecificNegotiator from '../../../platform-api/negotiators/get-specific-negotiator'
import ModalTab from './modal-tab/modal-tab'

type RenderedTenanciesPageProps = {
  data: NonNullable<TenancyModelPagedResult>
  cellIndexHandler: {
    handleIndexCell: React.Dispatch<React.SetStateAction<number | null>>
    indexCell: number | null
  }
  paginationHandler: {
    handlePagination: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
  }
}

const generateTableContent = (data: NonNullable<TenancyModelPagedResult>) => (handleModal: () => void) => {
  const result: RowProps[] = []
  data._embedded?.map((data: TenancyModel) => {
    result.push({
      cells: [
        {
          label: 'Status',
          value: data.status,
        },
        {
          label: 'Rent Frequency',
          value: data.rentFrequency,
        },
      ],
      expandableContent: {
        content: (
          <FlexContainer isFlexAlignEnd>
            <Button intent="primary" fixedWidth onClick={handleModal}>
              Details
            </Button>
          </FlexContainer>
        ),
      },
    })
  })

  return result
}

const RenderedTenanciesPage = ({
  data,
  cellIndexHandler: { handleIndexCell, indexCell },
  paginationHandler: { handlePagination, currentPage },
}: RenderedTenanciesPageProps) => {
  const [selectedTemporaryTenancyData, setSelectedTemporaryTenancyData] = React.useState<TenancyModel | null>(null)

  const { data: ApplicantData, isFetched: isTempApplicantFetched } = useGetSpecificApplicant({
    id: selectedTemporaryTenancyData?.applicantId,
  })
  const { data: PropertiesData, isFetched: isTempPropertyFetched } = useGetSpecificProperty({
    id: selectedTemporaryTenancyData?.propertyId,
  })
  const { data: NegotiatorsData, isFetched: isTempNegotiatorFetched } = useGetSpecificNegotiator({
    id: selectedTemporaryTenancyData?.negotiatorId,
  })

  // store all temporary data with this variable
  const allTempData = {
    isAllTempFetched: !!(
      isTempApplicantFetched &&
      isTempPropertyFetched &&
      isTempNegotiatorFetched &&
      selectedTemporaryTenancyData
    ),
    data: {
      applicant: ApplicantData,
      tenant: selectedTemporaryTenancyData,
      negotiator: NegotiatorsData,
      property: PropertiesData,
    },
  } as const

  const { openModal, Modal: ModalTenant } = useModal('docs-root')

  const handleModal = React.useCallback(() => {
    if (typeof indexCell === 'number') setSelectedTemporaryTenancyData(data?._embedded?.[indexCell] as TenancyModel)
    openModal()
  }, [indexCell])

  return (
    <>
      <div className="el-mt3">
        <Table
          numberColumns={3}
          indexExpandedRow={indexCell}
          setIndexExpandedRow={handleIndexCell}
          rows={generateTableContent(data)(handleModal)}
        />
      </div>
      <div className="el-mt6">
        <Pagination callback={handlePagination} currentPage={currentPage} numberPages={data.totalPageCount!} />
      </div>

      <ModalTenant>
        <FlexContainer className="el-wfull">
          {allTempData.isAllTempFetched ? (
            <>
              <ModalTab data={allTempData.data} />
            </>
          ) : (
            <Loader label="Getting data..." />
          )}
        </FlexContainer>
      </ModalTenant>
    </>
  )
}

export default RenderedTenanciesPage
// Yes Will I;m available
// Wow, that was amazing, I'll notice with the others Will
// Oh thats great Will, I will notice the others first, thank you
