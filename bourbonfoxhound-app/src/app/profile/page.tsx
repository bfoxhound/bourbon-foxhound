'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GlassWater, MapPin, Star, Settings, LogOut, Camera, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  user_metadata: {
    username?: string
  }
}

interface Review {
  id: string
  rating: number
  notes: string
  location_name: string | null
  photo_urls: string[]
  created_at: string
  bourbon: {
    name: string
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalReviews: 0,
    avgRating: 0,
    locations: 0
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Fetch user's reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select(`
          *,
          bourbon:bourbon_id (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (reviewsData) {
        setReviews(reviewsData)
        
        // Calculate stats
        const total = reviewsData.length
        const avg = total > 0 
          ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / total 
          : 0
        const uniqueLocations = new Set(reviewsData.filter(r => r.location_name).map(r => r.location_name)).size

        setStats({
          totalReviews: total,
          avgRating: Math.round(avg * 10) / 10,
          locations: uniqueLocations
        })
      }

      setLoading(false)
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-amber-700 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading profile...</p>
        </div>
      </main>
    )
  }

  if (!user) return null

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Hunter'

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/feed" className="flex items-center space-x-2">
            <GlassWater className="h-6 w-6 text-amber-700" />
            <div className="flex flex-col">
              <span className="font-bold hidden sm:inline">BourbonFoxhound</span>
              <span className="text-xs text-stone-500 italic hidden sm:inline">Intel, not ego.</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/map" className="text-stone-600 hover:text-amber-700">
              <MapPin className="h-5 w-5" />
            </Link>
            <Link href="/learn" className="text-stone-600 hover:text-amber-700">
              Learn
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-2xl font-bold">
              {username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-stone-900">{username}</h1>
              <p className="text-stone-500">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-stone-600">
                  <span className="font-semibold text-stone-900">{stats.totalReviews}</span> reviews
                </span>
                <span className="text-sm text-stone-600">
                  <span className="font-semibold text-stone-900">{stats.locations}</span> locations
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-red-600 transition"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-700">{stats.totalReviews}</p>
            <p className="text-sm text-stone-500">Reviews</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-700">{stats.avgRating || '-'}</p>
            <p className="text-sm text-stone-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-700">{stats.locations}</p>
            <p className="text-sm text-stone-500">Places</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link 
            href="/reviews/new"
            className="bg-amber-700 text-white rounded-xl p-4 flex items-center justify-between hover:bg-amber-800 transition"
          >
            <div className="flex items-center space-x-3">
              <Camera className="h-6 w-6" />
              <span className="font-semibold">Add New Review</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
          <Link 
            href="/map"
            className="bg-white border-2 border-amber-700 text-amber-700 rounded-xl p-4 flex items-center justify-between hover:bg-amber-50 transition"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6" />
              <span className="font-semibold">View Map</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Recent Reviews */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Recent Reviews</h2>
          
          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <Camera className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-stone-700 mb-2">No reviews yet</h3>
              <p className="text-stone-500 mb-4">Start tracking your bourbon journey</p>
              <Link 
                href="/reviews/new"
                className="inline-block bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
              >
                Add Your First Review
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{review.bourbon.name}</h3>
                        {review.location_name && (
                          <p className="text-sm text-stone-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {review.location_name}
                          </p>
                        )}
                      </div>
                      <div className="flex text-amber-400">
                        {'★'.repeat(review.rating)}
                        {'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    
                    {review.notes && (
                      <p className="text-stone-600 mt-3 text-sm">{review.notes}</p>
                    )}
                    
                    <p className="text-xs text-stone-400 mt-3">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
