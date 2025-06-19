const fetch = require('node-fetch');

async function testCalculatorAPI() {
  const testData = {
    name: "Test Company",
    legalForm: "GmbH",
    canton: "ZH",
    revenue: 1200000,
    profit: 240000,
    employees: 8,
    industry: "Technology",
    vatRegistered: true
  };

  try {
    console.log('Testing Analyze API...');
    const analyzeResponse = await fetch('http://localhost:3001/api/calculator/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Analyze Status:', analyzeResponse.status);
    const analyzeResult = await analyzeResponse.text();
    console.log('Analyze Response:', analyzeResult);

    console.log('\nTesting Compare API...');
    const compareResponse = await fetch('http://localhost:3001/api/calculator/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Compare Status:', compareResponse.status);
    const compareResult = await compareResponse.text();
    console.log('Compare Response:', compareResult);

  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testCalculatorAPI(); 