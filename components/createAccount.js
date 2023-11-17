import { Card } from '../utils/buildComponent.js';
import { CreateAccountForm } from './createAccountForm.js';

export function CreateAccount() {
	return <Card header="Create Account" body={<CreateAccountForm />} />;
}
