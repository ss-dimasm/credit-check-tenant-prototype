import React from 'react'
import { ApplicantModel, NegotiatorModel, PropertyModel, TenancyModel } from '@reapit/foundations-ts-definitions'
import { Tabs } from '@reapit/elements'
import { useModalTabContent } from './use-modal-tab-content'

export type ModalTabProps = {
  data: {
    applicant: ApplicantModel | undefined
    tenant: TenancyModel | null
    negotiator: NegotiatorModel | undefined
    property: PropertyModel | undefined
  }
}

// TODO:
// render applicant, tenant, negotiator, property temporary data with Tab menu
// able to check is the current tenant is pass for have new.

const ModalTab = (props: ModalTabProps) => {
  const [tabName, changeHandler, tabOptions, tabContent] = useModalTabContent({
    tabName: 'wekekeform',
    tabsName: ['Applicant', 'Negotiator', 'Property'],
  })
  console.log(props)
  return (
    <>
      <Tabs
        name={tabName}
        isFullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeHandler.setTabActiveIndex(e.target.value as typeof changeHandler.currentTabActiveIndex)
        }
        options={tabOptions}
      />
      {tabContent}
    </>
  )
}

export default ModalTab
