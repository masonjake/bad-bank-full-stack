import { Card } from '../utils/buildComponent.js';
import { LoginForm } from './loginForm.js';

export function Login() {
	return <Card header="Login" body={<LoginForm />} />;
}
