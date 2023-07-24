import { getAllUsers } from '@/lib/users/getAllUsers'
import Image from 'next/image'

export default async function Home() {
  const data = await getAllUsers();

  console.log('users', data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}
