import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { Config } from './types/global'
import config from './reapit.config.json'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

// Init global config
window.reapit = {
  config: {
    appEnv: 'local',
    connectClientId: '',
    connectOAuthUrl: '',
    connectUserPoolId: '',
    platformApiUrl: '',
    marketplaceUrl: '',
  },
}

export const renderApp = (Component: FC) => {
  const rootElement = document.querySelector('#root') || document.body
  const isDesktop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])
  const html = document.querySelector('html')

  if (isDesktop && html) {
    html.classList.add('is-desktop')
  }

  if (rootElement) {
    createRoot(rootElement).render(<Component />)
  }
}

const run = async () => {
  try {
    const globalConfig: Config = config
    // Set the global config
    window.reapit.config = globalConfig

    // I import the app dynamically so that the config is set on window and I avoid any
    // runtime issues where config is undefined
    const { default: App } = await import('./core/app')

    renderApp(App)
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://cra.link/PWA
    serviceWorkerRegistration.register()
  } catch (error) {
    console.error('Cannot fetch config', error)
  }
}

run()
