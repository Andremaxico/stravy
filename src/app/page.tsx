
import { getAllUsers } from '@/lib/users/getAllUsers'
import { getRGBColor, getAccessibleColor } from '@/utils';
import Image from 'next/image'
import { SearchRecipe } from './components/SearchRecipe';
import { CoverImage } from './components/CoverImage';

export default async function Home() {
  const data = await getAllUsers();

  console.log('users', data);
  return (
    <main className="
      main
      flex flex-col items-center justify-between
      min-h-screen 
    ">
      <CoverImage />
      <div className="w-screen h-screen flex items-center justify-center">
        <SearchRecipe />
      </div>
    </main>
  )
}
