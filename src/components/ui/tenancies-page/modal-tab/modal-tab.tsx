import React from 'react'
import { ApplicantModel, NegotiatorModel, PropertyModel, TenancyModel } from '@reapit/foundations-ts-definitions'

type ModalTabProps = {
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
  console.log(props)
  return <div>ModalTab</div>
}

export default ModalTab
