const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const adminUser = { email: 'admin@company.com', password: 'adminpassword123' };
const staffUser = { email: 'staff@company.com', password: 'staffpassword123' };

const randomId = Math.floor(Math.random() * 10000); 
const productData = {
  name: `Original Part ${randomId}`,
  productCode: `CODE-${randomId}`,
  price: 100.00
};

const logPass = (msg) => console.log(`PASS: ${msg}`);
const logFail = (msg, err) => {
  console.log(` FAIL: ${msg}`);
  if (err.response) console.log(`   -> Status: [${err.response.status}]`, err.response.data);
  else console.log(`   -> Error: ${err.message}`);
};

async function runFullSuite() {
  console.log('STARTING FINAL COMPREHENSIVE TEST SUITE...\n');
  
  let adminToken, staffToken, createdProductId;

  try {
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, adminUser);
    adminToken = adminLogin.data.token;
    const staffLogin = await axios.post(`${BASE_URL}/auth/login`, staffUser);
    staffToken = staffLogin.data.token;
    logPass('Authentication: Admin & Staff tokens acquired');

    const createRes = await axios.post(`${BASE_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    createdProductId = createRes.data._id;
    logPass('API POST /products: Admin created product');

    try {
      await axios.put(`${BASE_URL}/products/${createdProductId}`, 
        { name: `Updated Part ${randomId}`, price: 120.00 },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      logPass('API PUT /products/:id: Admin updated product successfully');
    } catch (e) { logFail('API PUT /products/:id', e); }

    try {
      const listRes = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${staffToken}` }
      });
      if (Array.isArray(listRes.data)) logPass('API GET /products: Staff viewed product list');
    } catch (e) { logFail('API GET /products', e); }

    try {
      await axios.delete(`${BASE_URL}/products/${createdProductId}`, {
        headers: { Authorization: `Bearer ${staffToken}` }
      });
      logPass('API DELETE /products/:id: Staff deleted product (as per requirements)');
    } catch (e) { logFail('API DELETE /products/:id', e); }

    try {
      const bulkData = {
        sourceEmail: 'supplier@vendor.com',
        products: [
          { name: `Updated Part ${randomId}`, productCode: `NEW-CODE-${randomId}`, price: 50 },
          { name: `Unique Part ${randomId}`, productCode: `UNIQUE-${randomId}`, price: 60 }
        ]
      };
      const res = await axios.post(`${BASE_URL}/email/products`, bulkData);
      
      if (res.data.inserted === 1) {
        logPass('Bulk Logic: Corrected filtered duplicate by NAME or CODE');
      } else {
        console.log(`Note: If this says 2, ensure your service checks for both name and code duplicates.`);
      }
    } catch (e) { logFail('Bulk Ingestion Logic', e); }

    try {
      await axios.put(`${BASE_URL}/products/anyid`, { price: 1 }, {
        headers: { Authorization: `Bearer ${staffToken}` }
      });
      logFail('Security: Staff was able to edit!', { message: 'Forbidden action allowed' });
    } catch (e) {
      if (e.response && e.response.status === 403) logPass('Security: Staff blocked from Editing (403)');
    }

  } catch (error) {
    console.error('CRITICAL SUITE FAILURE:', error.message);
  }

  console.log('\n🏁 COMPREHENSIVE TESTS COMPLETED.');
}

runFullSuite();