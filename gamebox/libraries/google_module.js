var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');

const CLIENT_ID = '535555503630-4064t3rh33ev4c0c32flv1v06ott8rg1.apps.googleusercontent.com';
const CLIENT_SECRET = 'ivJUJGfVE0Z4xDyjhE7PSHTs';
const REDIRECT_URL = 'http://localhost:3000/site/set-access-token';
const SCOPES = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.profile.emails.read'];

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

module.exports =  {
    getAccessUrl: () => {
        var access_url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        return access_url;
    },
    setAccessToken: (req, res) => {
        oauth2Client.getToken(req.query.code, (err, tokens) => {
            if (err) {
                res.redirect('/');
            }
            oauth2Client.setCredentials(tokens);
            plus.people.get({ userId: 'me', auth: oauth2Client }, (err, profile) => {
                if (!err) {
                    req.session.current_user = {
                        email: profile.emails[0].value,
                        username: profile.displayName,
                    };
                }
                res.redirect('/');
            });
        });
    }
}