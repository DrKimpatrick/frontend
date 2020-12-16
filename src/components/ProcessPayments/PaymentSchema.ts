import * as Yup from 'yup';

const RequiredString = (msg: string) => Yup.string().trim().required(msg);

export const PaymentSchema = Yup.object().shape({
  billingAddress: RequiredString('Billing Address is required'),
  cardHolder: RequiredString('Cardholder is required')
});
