// ✅ Load .env.local as the only config source
require('dotenv').config({ path: '.env.local' });

const Stripe = require('stripe');

// ✅ Debug environment variable loading
console.log('🔍 Debugging environment variables...');
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_SECRET_KEY starts with:', process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 8) : 'undefined');
console.log('All env vars starting with STRIPE:', Object.keys(process.env).filter(key => key.startsWith('STRIPE')));

// ✅ Immediately verify the env variable is loaded
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found in .env.local');
  console.error('Please add your Stripe secret key to .env.local first');
  process.exit(1);
}

// ✅ Now safely initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
  try {
    console.log('🔧 Setting up Stripe products for TaxPilot AI...\n');

    // Create Starter Plan Product
    console.log('Creating Starter Plan product...');
    const starterProduct = await stripe.products.create({
      name: 'TaxPilot AI - Starter Plan',
      description: 'Ideal for SMEs needing regular tax monitoring and optimization',
      metadata: {
        plan_type: 'starter',
        features: JSON.stringify([
          'Unlimited tax calculations',
          'Tax health monitoring',
          'Compliance calendar',
          'Email alerts',
          'Save up to 5 company profiles',
          'AI-powered recommendations'
        ])
      }
    });

    // Create Starter Plan Price (CHF 197/month with 14-day trial)
    const starterPrice = await stripe.prices.create({
      product: starterProduct.id,
      unit_amount: 19700, // CHF 197.00 in cents
      currency: 'chf',
      recurring: {
        interval: 'month',
        trial_period_days: 14
      },
      metadata: {
        plan_id: 'starter'
      }
    });

    console.log(`✅ Starter Plan created: ${starterProduct.id}`);
    console.log(`✅ Starter Price created: ${starterPrice.id}\n`);

    // Create Professional Plan Product
    console.log('Creating Professional Plan product...');
    const professionalProduct = await stripe.products.create({
      name: 'TaxPilot AI - Professional Plan',
      description: 'Complete solution for businesses requiring expert guidance',
      metadata: {
        plan_type: 'professional',
        features: JSON.stringify([
          'Everything in Starter',
          'Unlimited company profiles',
          '2 expert consultation credits/month',
          'Priority support',
          'Advanced reporting',
          'Custom tax strategies',
          'Regulatory update notifications'
        ])
      }
    });

    // Create Professional Plan Price (CHF 497/month with 14-day trial)
    const professionalPrice = await stripe.prices.create({
      product: professionalProduct.id,
      unit_amount: 49700, // CHF 497.00 in cents
      currency: 'chf',
      recurring: {
        interval: 'month',
        trial_period_days: 14
      },
      metadata: {
        plan_id: 'professional'
      }
    });

    console.log(`✅ Professional Plan created: ${professionalProduct.id}`);
    console.log(`✅ Professional Price created: ${professionalPrice.id}\n`);

    // Output environment variables
    console.log('🎉 Setup complete! Add these to your .env.local file:\n');
    console.log('# Stripe Product Price IDs');
    console.log(`STRIPE_STARTER_PRICE_ID=${starterPrice.id}`);
    console.log(`STRIPE_PROFESSIONAL_PRICE_ID=${professionalPrice.id}\n`);

    console.log('📋 Product Summary:');
    console.log(`Starter Plan: ${starterProduct.name} - CHF 197/month`);
    console.log(`Professional Plan: ${professionalProduct.name} - CHF 497/month`);
    console.log('Both plans include 14-day free trial\n');

    console.log('🔗 Next steps:');
    console.log('1. Add the price IDs to your .env.local file');
    console.log('2. Configure your Stripe webhook endpoint in Stripe Dashboard');
    console.log('3. Add webhook secret to .env.local');
    console.log('4. Test the checkout flow\n');

    return {
      starterPriceId: starterPrice.id,
      professionalPriceId: professionalPrice.id
    };

  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      console.error('Make sure your STRIPE_SECRET_KEY is set correctly in .env.local');
    }
    
    throw error;
  }
}

// Run the setup
if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });
  
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in .env.local');
    console.error('Please add your Stripe secret key to .env.local first');
    process.exit(1);
  }
  
  setupStripeProducts()
    .then(() => {
      console.log('✅ Stripe setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { setupStripeProducts }; 