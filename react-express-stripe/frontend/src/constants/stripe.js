const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_24pC4ccFxZRIVEW688mCiOwt'
  : 'pk_test_SQS413oSr7A41KpVC5vzxoDk';

export default STRIPE_PUBLISHABLE;

