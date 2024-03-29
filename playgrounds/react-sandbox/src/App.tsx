import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AtomPage } from './pages/atom'
import { API_TEST_PAGE, CONNECTOR_PAGE, STATE } from './core/constants/routers'
import { Layout } from './layout'
import { ApiTestPage } from './pages/apiTest'
import { ConnectorsPage } from './pages/connectors'
import { StatePage } from './pages/state'
import { ThemeServiceTest } from './pages/themeServiceTest'
import { AccountContextProvider } from './services/accountService/AccountsService'
import { ThemeContextProvider } from './services/ThemeService'
import { getConnectorByName } from './utils/connectors/connectorUtils'

export const App: FC = () => {
  return (
    <AccountContextProvider getConnectorByName={getConnectorByName}>
      <ThemeContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/*" element={<ThemeServiceTest />} />
              <Route path={API_TEST_PAGE} element={<ApiTestPage />} />
              <Route path={CONNECTOR_PAGE} element={<ConnectorsPage />} />
              <Route path={STATE} element={<StatePage />} />
              <Route path={'atom'} element={<AtomPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeContextProvider>
    </AccountContextProvider>
  )
}
