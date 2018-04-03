import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import config from './config'
import { translate, isRTL } from 'src/utils/i18n'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Tapsell, { BannerAd, BANNER_320x50 } from 'react-native-tapsell'
import { store, persistor } from './redux/store'
import { initVideoAd } from './redux/Main.reducer'
import Navigator from './Navigator'
import { black, darkOrange } from 'src/theme'
import codepush from 'react-native-code-push'

const { width } = Dimensions.get('window')

global.persistor = persistor

// setLocale('fa')
global.__t = translate
global.toast = data => alert(JSON.stringify(data))
TouchableOpacity.defaultProps.activeOpacity = 0.8

Tapsell.setDebugMode(__DEV__)
Tapsell.initialize(config.tapsellKey)
store.dispatch(initVideoAd())

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={styles.wrapper}>
        <StatusBar
          backgroundColor={darkOrange}
          // translucent
        />
        <Navigator uriPrefix='whichy'/>

        <View
          style={{
            width,
            alignItems: 'center',
            backgroundColor: black,
            paddingVertical: 5,
          }}
        >
          <BannerAd
            zoneId={config.adZones.bottomBanner}
            bannerType={BANNER_320x50}
          />
        </View>
      </View>
    </PersistGate>
  </Provider>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default codepush(App)