import { Card } from '../utils/buildComponent.js';
import { WithdrawForm } from './withdrawForm.js';

export function Withdraw() {
	return <Card header="Withdraw" body={<WithdrawForm />} />;
}
