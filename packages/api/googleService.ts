import {gapi} from 'gapi-script';

const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

class GoogleAuthService {
  private authInstance?: gapi.auth2.GoogleAuth;

  constructor() {
    this.initClient();
  }

  private initClient(): void {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            clientId: GOOGLE_CLIENT_ID,
            scope: 'email profile openid',
          })
          .then(() => {
            this.authInstance = gapi.auth2.getAuthInstance();
            console.log('gapi client initialized');
          })
          .catch((error) => {
            console.error('Error initializing gapi client:', error);
          });
      });
    };
    script.onerror = (error) => {
      console.error('Error loading gapi script:', error);
    };
    document.body.appendChild(script);
  }

  public async signIn(): Promise<string> {
    if (!this.authInstance) {
      throw new Error(
        'Google Auth instance not initialized. Please wait for initialization.',
      );
    }
    try {
      const googleUser = await this.authInstance.signIn();
      return googleUser.getAuthResponse().id_token;
    } catch (error) {
      console.error('Google Sign-In Error', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    if (this.authInstance) {
      try {
        await this.authInstance.signOut();
        console.log('User signed out.');
      } catch (error) {
        console.error('Google Sign-Out Error', error);
      }
    }
  }
}

export const googleService = new GoogleAuthService();