import { gapi } from 'gapi-script';

const GOOGLE_CLIENT_ID =
    import.meta.env?.VITE_GOOGLE_CLIENT_ID ||
    'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

class GoogleAuthService {
    private authInstance?: gapi.auth2.GoogleAuth;
    private initPromise: Promise<void>;

    constructor() {
        this.initPromise = this.initClient();
    }

    private initClient(): Promise<void> {
        return new Promise((resolve, reject) => {
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
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Error initializing gapi client:', error);
                            reject(error);
                        });
                });
            };
            script.onerror = (error) => {
                console.error('Error loading gapi script:', error);
                reject(error);
            };
            document.body.appendChild(script);
        });
    }

    public async signIn(): Promise<string> {
        await this.initPromise; // Wait for initialization to complete

        if (!this.authInstance) {
            // This check is now mostly for type safety, as initPromise would have rejected on failure.
            throw new Error('Google Auth instance failed to initialize.');
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
        await this.initPromise;

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