import { Card } from '../utils/buildComponent.js';
import { TransferForm } from '../components/transferForm.js';

export function Transfer() {
	return <Card header="Transfer" body={<TransferForm />} />;
}
