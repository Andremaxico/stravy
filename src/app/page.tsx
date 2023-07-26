
import { getAllUsers } from '@/lib/users/getAllUsers'
import { getRGBColor, getAccessibleColor } from '@/utils';
import Image from 'next/image'
import { SearchRecipe } from './components/SearchRecipe';

export default async function Home() {
  const data = await getAllUsers();

  console.log('users', data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchRecipe />
    </main>
  )
}
