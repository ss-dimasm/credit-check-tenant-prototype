import React, { useMemo } from 'react'

import { TenancyModel, TenancyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Button, FlexContainer, Loader, Pagination, RowProps, Table, useModal } from '@reapit/elements'

import useGetSpecificApplicant from '../../../platform-api/applicants/get-specific-applicant'
import useGetSpecificProperty from '../../../platform-api/properties/get-specific-property'
import useGetSpecificNegotiator from '../../../platform-api/negotiators/get-specific-negotiator'
import ModalTab from './modal-tab'

type RenderedTenanciesPageProps = {
  data: NonNullable<TenancyModelPagedResult>
  cellIndexHandler: {
    handleIndexCell: React.Dispatch<React.SetStateAction<RenderedTenanciesPageProps['cellIndexHandler']['indexCell']>>
    indexCell: number | null
  }
  paginationHandler: {
    handlePagination: React.Dispatch<
      React.SetStateAction<RenderedTenanciesPageProps['paginationHandler']['currentPage']>
    >
    currentPage: number
  }
}

const generateTableContent = ({
  data,
  handleModal,
}: {
  data: NonNullable<TenancyModelPagedResult>
  handleModal: (data: TenancyModel) => void
}) => {
  const result: RowProps[] = []
  data?._embedded?.forEach((data: TenancyModel) => {
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
            <Button intent="primary" fixedWidth onClick={() => handleModal(data)}>
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
  const [selectedTemporaryTenancyData, setSelectedTemporaryTenancyData] = React.useState<TenancyModel | undefined>(
    undefined,
  )

  const applicantFetchCustomHook = useGetSpecificApplicant({
    id: selectedTemporaryTenancyData?.applicantId ?? 'asd',
  })

  const propertyFetchCustomHook = useGetSpecificProperty({
    id: selectedTemporaryTenancyData?.propertyId,
  })

  const negotiatorFetchCustomHook = useGetSpecificNegotiator({
    id: selectedTemporaryTenancyData?.negotiatorId,
  })

  const allTempData = useMemo(
    () => ({
      isAllTempFetched: !!(
        applicantFetchCustomHook.isFetched &&
        propertyFetchCustomHook.isFetched &&
        negotiatorFetchCustomHook.isFetched &&
        selectedTemporaryTenancyData
      ),
      data: {
        applicant: applicantFetchCustomHook.data,
        tenant: selectedTemporaryTenancyData,
        negotiator: negotiatorFetchCustomHook.data,
        property: propertyFetchCustomHook.data,
      },
    }),
    [applicantFetchCustomHook, selectedTemporaryTenancyData, propertyFetchCustomHook, negotiatorFetchCustomHook],
  )

  const { openModal, Modal: ModalTenant } = useModal('docs-root')

  const handleModal = React.useCallback(
    (data: TenancyModel) => {
      typeof indexCell === 'number' && setSelectedTemporaryTenancyData(data)
      openModal()
    },
    [indexCell],
  )

  console.log(selectedTemporaryTenancyData?.applicantId)

  return (
    <>
      <div className="el-mt3">
        <Table
          numberColumns={3}
          indexExpandedRow={indexCell}
          setIndexExpandedRow={handleIndexCell}
          rows={generateTableContent({ data, handleModal })}
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
