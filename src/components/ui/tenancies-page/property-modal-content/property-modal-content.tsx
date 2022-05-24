import React from 'react'

import { Subtitle } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { notification } from 'constants/message'

const MODAL_NAME = 'Property'

type PropertyModalContentProps = {
  data: PropertyModel | undefined
}
const PropertyModalContent = ({ data }: PropertyModalContentProps) => {
  if (!data) return <Subtitle>{notification.NOT_AVAILABLE(MODAL_NAME)}</Subtitle>

  console.log(data)
  return (
    <>
      <div>PropertyModalContent</div>
    </>
  )
}

export default PropertyModalContent
