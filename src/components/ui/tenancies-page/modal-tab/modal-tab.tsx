import React from 'react'
import { ApplicantModel, NegotiatorModel, PropertyModel, TenancyModel } from '@reapit/foundations-ts-definitions'
import { FlexContainer, Subtitle, Tabs } from '@reapit/elements'
import { useModalTabContent } from './use-modal-tab-content'

import NegotiatorModalContent from '../negotiator-modal-content'
import PropertyModalContent from '../property-modal-content'
import TenantModalContent from '../tenant-modal-content'

export type ModalTabProps = {
  data: {
    applicant: ApplicantModel | undefined
    tenant: TenancyModel | undefined
    negotiator: NegotiatorModel | undefined
    property: PropertyModel | undefined
  }
}

// eslint-disable-next-line no-unused-vars
const ModalTab = ({ data: { applicant, tenant, negotiator, property } }: ModalTabProps) => {
  const [tabName, changeHandler, tabOptions, currentTabContent] = useModalTabContent({
    tabName: 'my-cool-tab-content',
    tabsName: [
      {
        names: 'Tenants',
        content: <TenantModalContent tenantData={tenant} applicantData={applicant} />,
      },
      {
        names: 'Negotiator',
        content: <NegotiatorModalContent data={negotiator} />,
      },
      {
        names: 'Property',
        content: <PropertyModalContent data={property} />,
      },
    ],
  })

  return ((): React.ReactElement => {
    if (!!applicant && !!tenant && !!negotiator && !!property) {
      return <Subtitle>Try fetch another Modal Tab ID</Subtitle>
    } else {
      return (
        <FlexContainer isFlexColumn className="el-wfull">
          <Tabs
            name={tabName}
            isFullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              changeHandler.setTabActiveIndex(e.target.value as typeof changeHandler['currentTabActiveIndex'])
            }}
            options={tabOptions}
          />
          {currentTabContent}
        </FlexContainer>
      )
    }
  })()
}

export default ModalTab
