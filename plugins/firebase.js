import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

export default (
  {
    $config: {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
      recaptchaKey
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
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaKey),
    isTokenAutoRefreshEnabled: true
  })
  const storage = getStorage(app)
  inject('fire', { storage })
}
