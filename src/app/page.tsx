'use client';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAllUsers } from '@/lib/users/getAllUsers'
import { getRGBColor, getAccessibleColor } from '@/utils';
import Image from 'next/image'
import { SearchRecipe } from './components/SearchRecipe';
import { CoverImage } from './components/CoverImage';
import { auth } from "@/firebase/config";
import { useEffect } from "react";

export default async function Home() {
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
