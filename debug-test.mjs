async function testAPI() {
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
    console.log('Testing with fetch API...');
    
    const response = await fetch('http://localhost:3001/api/calculator/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response body:', text);
    
    if (response.ok) {
      try {
        const json = JSON.parse(text);
        console.log('Parsed JSON:', json);
      } catch (e) {
        console.log('Not valid JSON');
      }
    }

  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

testAPI(); 