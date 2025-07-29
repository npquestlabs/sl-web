import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader(): Promise<void> {
  const usersList: unknown[] = [];
  console.log('loader', process.env.DATABASE_URL, usersList);
}

export default function Home() {
  return <Welcome />;
}
