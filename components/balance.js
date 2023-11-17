import { Card } from '../utils/buildComponent.js';
import { BalanceTable } from '../components/balanceTable.js';

export function Balance() {
	return <Card header="Balance" body={<BalanceTable />} />;
}
