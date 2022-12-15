export default function handler(req, res) {
    if (req.method === 'GET') {
        res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
    }
}
