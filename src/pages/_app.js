import { Fragment } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import store from "../redux/store";
import { Provider } from "react-redux";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const persistor = persistStore(store);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>IBAES - IDEAS</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NotificationContainer />
              <AuthProvider>
                <AuthConsumer>
                  {(auth) =>
                    auth.isLoading ? <Fragment /> : getLayout(<Component {...pageProps} />)
                  }
                </AuthConsumer>
              </AuthProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
};

export default App;
