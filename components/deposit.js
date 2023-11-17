import { Card } from '../utils/buildComponent.js';
import { DepositForm } from '../components/depositForm.js';

export function Deposit() {
	return <Card header="Deposit" body={<DepositForm />} />;
}
