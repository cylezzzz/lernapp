'use client'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const signInWithEmail = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: prompt('Deine E-Mail?') || ''
    })
    if (error) alert(error.message)
    else alert('Check deine E-Mails für den Magic Link!')
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` }
    })
    if (error) alert(error.message)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <button onClick={signInWithEmail} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login via E-Mail
      </button>
      <button onClick={signInWithGoogle} className="bg-red-500 text-white px-4 py-2 rounded">
        Login mit Google
      </button>
    </div>
  )
}