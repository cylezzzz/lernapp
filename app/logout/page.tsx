'use client'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            await supabase.auth.signOut()
            router.push('/login')
        }
        logout()
    }, [router])

    return <p className="text-center p-10">Wird ausgeloggt...</p>
}
