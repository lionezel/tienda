// En tu archivo index.ts de Firebase Cloud Functions
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51P7Kr52K91G4lYWEpwkoswRL12Ch51uX7DKhYLmzhM3vv7tOQFF2xLwwptUQRnzoa5C4OgpYqqyJ6oGbI22rgNqY002ZQ5plmM');


const stripeSecretKey = 'sk_test_51P7Kr52K91G4lYWEpwkoswRL12Ch51uX7DKhYLmzhM3vv7tOQFF2xLwwptUQRnzoa5C4OgpYqqyJ6oGbI22rgNqY002ZQ5plmM';
const stripeClient = new stripe(stripeSecretKey);

export const procesarPago = functions.https.onCall(async (data:any, context: any) => {
    try {
        const { amount, currency, source } = data;
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount,
            currency,
            source,
        });
        return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        throw new functions.https.HttpsError('internal', 'Error al procesar el pago');
    }
});
