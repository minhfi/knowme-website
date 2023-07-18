interface Window {
  /**
   * Google API Client
   * Sign in with Google callback
   */
  googleCredentialResponse: ((response: {
    clientId: string
    client_id: string
    credential: string
    select_by: string
  }) => any)
}
