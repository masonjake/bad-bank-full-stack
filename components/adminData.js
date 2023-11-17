import { Card } from '../utils/buildComponent.js';
import { AdminDataTable } from '../components/adminDataTable.js';

export function AdminData() {
	return <Card header="Admin Data" body={<AdminDataTable />} />;
}
