import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const {
  initializeAppCheck,
  ReCaptchaV3Provider
} = require('firebase/app-check')
export default (
  {
    $config: {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    }
  },
  inject
) => {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  }
  const app = initializeApp(firebaseConfig)
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      '6LdNTUghAAAAAHrEmXqL-f5NXFNIP92bZHUkf-7H'
    ),
    isTokenAutoRefreshEnabled: true
  })

  const storage = getStorage(app)
  inject('fire', { storage, appCheck })
}
