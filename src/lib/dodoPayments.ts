// import axios from 'axios';
// const dodoPaymentsClient = (dodoPaymentsApiKey?:string) => {
//   return axios.create({
//     baseURL: 'https://test.dodopayments.com', // Use 'https://test.dodopayments.com' for testing
//     headers: {
//       Accept: 'application/vnd.api+json',
//       'Content-Type': 'application/vnd.api+json',
//       Authorization: `Bearer ${dodoPaymentsApiKey || process.env.NEXT_DODO_PAYMENTS_API_KEY}`,
    
//     },
//   });
// };

// export default dodoPaymentsClient;


import DodoPayments from 'dodopayments';

export const dodoPaymentsClient = new DodoPayments({
  bearerToken: process.env.NEXT_DODO_PAYMENTS_API_KEY,
  environment:'test_mode'
});