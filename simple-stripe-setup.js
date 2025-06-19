const fs = require('fs');
const Stripe = require('stripe');

// Manually read .env.local file
function loadEnvFile() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const envVars = {};
    
    envFile.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error reading .env.local:', error.message);
    return {};
  }
}

async function setupStripeProducts() {
  console.log('🔧 Setting up Stripe products for TaxPilot AI...\n');
  
  // Load environment variables manually
  const envVars = loadEnvFile();
  
  console.log('🔍 Environment variables found:');
  console.log('- STRIPE_SECRET_KEY:', envVars.STRIPE_SECRET_KEY ? 'Found (' + envVars.STRIPE_SECRET_KEY.substring(0, 10) + '...)' : 'Not found');
  console.log('- STRIPE_PUBLIC_KEY:', envVars.STRIPE_PUBLIC_KEY ? 'Found' : 'Not found');
  
  if (!envVars.STRIPE_SECRET_KEY) {
    console.error('\n❌ STRIPE_SECRET_KEY not found in .env.local');
    console.error('Please make sure your .env.local file contains:');
    console.error('STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key');
    process.exit(1);
  }
  
  // Initialize Stripe
  const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);
  
  try {
    // Test Stripe connection first
    console.log('\n🔗 Testing Stripe connection...');
    await stripe.products.list({ limit: 1 });
    console.log('✅ Stripe connection successful!\n');
    
    // Create Starter Plan Product
    console.log('Creating Starter Plan product...');
    const starterProduct = await stripe.products.create({
      name: 'TaxPilot AI - Starter Plan',
      description: 'Ideal for SMEs needing regular tax monitoring and optimization',
    });
    
    // Create Starter Plan Price (CHF 197/month with 14-day trial)
    const starterPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 19700, // CHF 197.00 in cents
      currency: 'chf',
      recurring: {
        interval: 'month',
      },
    });
    
    console.log(`✅ Starter Plan created: ${starterProduct.id}`);
    console.log(`✅ Starter Price created: ${starterPrice.id}\n`);
    
    // Create Professional Plan Product
    console.log('Creating Professional Plan product...');
    const professionalProduct = await stripe.products.create({
      name: 'TaxPilot AI - Professional Plan',
      description: 'Complete solution for businesses requiring expert guidance',
    });
    
    // Create Professional Plan Price (CHF 497/month with 14-day trial)
    const professionalPrice = await stripe.prices.create({
      product: professionalProduct.id,
      unit_amount: 49700, // CHF 497.00 in cents
      currency: 'chf',
      recurring: {
        interval: 'month',
      },
    });
    
    console.log(`✅ Professional Plan created: ${professionalProduct.id}`);
    console.log(`✅ Professional Price created: ${professionalPrice.id}\n`);
    
    // Output environment variables
    console.log('🎉 Setup complete! Add these to your .env.local file:\n');
    console.log('# Replace the empty STRIPE_*_PRICE_ID lines with:');
    console.log(`STRIPE_STARTER_PRICE_ID=${starterPrice.id}`);
    console.log(`STRIPE_PROFESSIONAL_PRICE_ID=${professionalPrice.id}\n`);
    
    console.log('📋 Product Summary:');
    console.log(`Starter Plan: CHF 197/month - Price ID: ${starterPrice.id}`);
    console.log(`Professional Plan: CHF 497/month - Price ID: ${professionalPrice.id}\n`);
    
    return {
      starterPriceId: starterPrice.id,
      professionalPriceId: professionalPrice.id
    };
    
  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.error('Make sure your STRIPE_SECRET_KEY is correct in .env.local');
      console.error('It should start with "sk_test_" for test mode');
    }
    
    throw error;
  }
}

// Run the setup
setupStripeProducts()
  .then(() => {
    console.log('✅ Stripe setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }); 