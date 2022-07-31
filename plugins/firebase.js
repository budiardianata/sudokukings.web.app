import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'
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
  const storage = getStorage(app)
  inject('fire', { storage, ref })
}
