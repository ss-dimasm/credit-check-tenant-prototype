import React from 'react'

import { notification } from 'constants/message'
import { Subtitle } from '@reapit/elements'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'

const MODAL_NAME = 'Negotiator'

type NegotiatorModelContentProps = {
  data: NegotiatorModel | undefined
}

const NegotiatorModalContent = ({ data }: NegotiatorModelContentProps) => {
  if (!data) return <Subtitle>{notification.NOT_AVAILABLE(MODAL_NAME)}</Subtitle>

  console.log(data)
  return <div>NegotiatorModalContent</div>
}

export default NegotiatorModalContent
