"use client"
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const {theme,setTheme}=useTheme()
  return (
    <>
    <button
    onClick={()=>setTheme(theme ==="dark"?"light":"dark")}
    className="p-2 rounded-lg hover:bg-border/50"
    >
        {theme =="dark" ? <Sun size = {20}/> : <Moon size = {20}/>}

    </button>
    </>
  )
}
