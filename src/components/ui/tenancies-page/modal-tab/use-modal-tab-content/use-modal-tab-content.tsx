import React, { useCallback } from 'react'
import { TabsOption } from '@reapit/elements'

type UseModalTabContentProps = {
  tabName: string
  tabsName: {
    names: string
    content: React.ReactElement
  }[]
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

  const tabOptions = useCallback(
    ({
      tabName,
      tabsName,
      currentTabActiveIndex,
    }: {
      tabName: ReturnType<typeof useModalTabContent>['0']
      tabsName: UseModalTabContentProps['tabsName']
      currentTabActiveIndex: ReturnType<typeof useModalTabContent>['1']['currentTabActiveIndex']
    }): TabsOption[] => {
      return tabsName.map((tab, index) => ({
        id: `${tabName}-${index}`,
        value: index.toString(),
        text: tab.names,
        isChecked: currentTabActiveIndex === index.toString(),
      }))
    },
    [],
  )

  const returnedContent = tabsName[currentTabActiveIndex]['content']

  return [
    tabName,
    { currentTabActiveIndex, setTabActiveIndex },
    tabOptions({ tabName, tabsName, currentTabActiveIndex }),
    returnedContent,
  ]
}
