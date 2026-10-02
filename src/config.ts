/** Firestore is opt-in: without a project id we fall back to localStorage. */
export const isFirestoreEnabled = Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID)
