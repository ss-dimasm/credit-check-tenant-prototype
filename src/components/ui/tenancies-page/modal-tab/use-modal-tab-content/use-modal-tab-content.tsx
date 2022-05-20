import React, { useCallback } from 'react'
import { TabsOption } from '@reapit/elements'

type UseModalTabContentProps = {
  tabName: string
  tabsName: string[]
}

export const useModalTabContent = ({
  tabName,
  tabsName,
}: UseModalTabContentProps): [
  tabName: string,
  changeHandler: {
    currentTabActiveIndex: unknown
    setTabActiveIndex: React.Dispatch<React.SetStateAction<typeof currentTabActiveIndex>>
  },
  tabOptions: TabsOption[],
  tabContent: React.ReactElement,
] => {
  const [currentTabActiveIndex, setTabActiveIndex] = React.useState<any>('0')

  const optionsStatic = useCallback(
    ({
      tabName,
      tabsName,
      currentTabActiveIndex,
    }: {
      tabName: UseModalTabContentProps['tabName']
      tabsName: UseModalTabContentProps['tabsName']
      currentTabActiveIndex: ReturnType<typeof useModalTabContent>['1']['currentTabActiveIndex']
    }): TabsOption[] => {
      return tabsName.map((tab, index) => ({
        // @ts-ignore
        id: tabName + React.useId(),
        value: index.toString(),
        text: tab,
        isChecked: currentTabActiveIndex === index.toString(),
      }))
    },
    [],
  )

  return [
    tabName,
    { currentTabActiveIndex, setTabActiveIndex },
    optionsStatic({ tabName, tabsName, currentTabActiveIndex }),
    <>h1</>,
  ]
}
