declare namespace google.accounts.oauth2 {
  // https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initCodeClient
  function initCodeClient(config: {
    client_id: string
    scope: string
    ux_mode: 'popup' | 'redirect'
    callback: ((response: {
      code: string
      scope: string
      authuser: string
      hd: string
      prompt: string
    }) => void)
  }): {
    requestCode(): void
  }

  // https://developers.google.com/identity/oauth2/web/reference/js-reference#google.accounts.oauth2.initTokenClient
  function initTokenClient(config: {
    client_id: string
    scope: string
    callback: ((response: {
      access_token: string
      token_type: string
      expires_in: number
      scope: string
      authuser: string
      hd: string
      prompt: string
    }) => any)
    error_callback?: ((error: Error & { type: string }) => any)
  }): {
    requestAccessToken(options?: Record<string, any>): void
  }
}
