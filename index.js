const express = require('express');
const app = express();

const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

app.use(express.json());

app.post('/generate-token', (req, res) => {
    const { appId, appCertificate, uid, channelName } = req.body;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        privilegeExpiredTs
    );

    return res.json({ token });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
