import React from 'react'
import { Subtitle } from '@reapit/elements'
import { ApplicantModel, TenancyModel } from '@reapit/foundations-ts-definitions'
import { notification } from 'constants/message'

const MODAL_NAME = 'Tenant'

type TenantModalContentProps = {
  tenantData: TenancyModel | undefined
  applicantData: ApplicantModel | undefined
}

const TenantModalContent = ({ tenantData, applicantData }: TenantModalContentProps) => {
  if (!tenantData) return <Subtitle>{notification.NOT_AVAILABLE(MODAL_NAME)}</Subtitle>

  console.log('tenant', tenantData)
  console.log('applicant', applicantData)
  return <div>TenantModalContent</div>
}

export default TenantModalContent
