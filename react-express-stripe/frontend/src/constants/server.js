const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://myappdomain.com'
  : 'http://localhost:3000'

export default PAYMENT_SERVER_URL;
