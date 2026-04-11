'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GlassWater, Plus, Map as MapIcon, List } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface Review {
  id: string
  rating: number
  notes: string
  location_name: string | null
  location_lat: number
  location_lng: number
  photo_urls: string[]
  created_at: string
  bourbon: {
    name: string
  }
  user: {
    username: string
    avatar_url: string | null
  }
}

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map')

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          bourbon:bourbon_id (name),
          user:user_id (username, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reviews:', error)
      } else {
        setReviews(data || [])
      }
      setLoading(false)
    }

    fetchReviews()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || viewMode !== 'map') return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-95, 40], // Center of US
      zoom: 3
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl())

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [viewMode])

  // Add markers when reviews load
  useEffect(() => {
    if (!map.current || reviews.length === 0) return

    reviews.forEach((review) => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.innerHTML = `
        <div style="
          width: 32px;
          height: 32px;
          background: #b45309;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          cursor: pointer;
        ">
          ${review.rating}
        </div>
      `
      el.style.transform = 'translate(-50%, -100%)'

      const marker = new mapboxgl.Marker(el)
        .setLngLat([review.location_lng, review.location_lat])
        .addTo(map.current!)

      marker.getElement().addEventListener('click', () => {
        setSelectedReview(review)
        map.current?.flyTo({
          center: [review.location_lng, review.location_lat],
          zoom: 14
        })
      })
    })

    // Fit bounds to show all markers
    if (reviews.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      reviews.forEach((r) => bounds.extend([r.location_lng, r.location_lat]))
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [reviews])

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-amber-700 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/feed" className="flex items-center space-x-2">
            <GlassWater className="h-6 w-6 text-amber-700" />
            <span className="font-bold hidden sm:inline">BourbonFoxhound</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/learn"
              className="hidden sm:flex items-center text-stone-600 hover:text-amber-700"
            >
              <BookOpen className="h-5 w-5 mr-1" />
              Learn
            </Link>
            
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-amber-100 text-amber-700' : 'text-stone-600'}`}
            >
              <MapIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'text-stone-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          <Link
            href="/reviews/new"
            className="bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1 hover:bg-amber-800"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Review</span>
          </Link>
        </div>
      </nav>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="relative h-[calc(100vh-56px)]">
          <div ref={mapContainer} className="absolute inset-0" />

          {/* Selected Review Popup */}
          {selectedReview && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-2 right-2 z-10 bg-black/50 text-white p-1 rounded-full"
              >
                ×
              </button>
              
              {selectedReview.photo_urls?.[0] && (
                <img
                  src={selectedReview.photo_urls[0]}
                  alt={selectedReview.bourbon.name}
                  className="w-full h-40 object-cover"
                />
              )}
              
              <div className="p-4">
                <h3 className="font-bold text-lg">{selectedReview.bourbon.name}</h3>
                <p className="text-sm text-stone-500">{selectedReview.location_name}</p>
                <div className="flex items-center mt-2">
                  {'★'.repeat(selectedReview.rating)}
                  {'☆'.repeat(5 - selectedReview.rating)}
                </div>
                {selectedReview.notes && (
                  <p className="text-sm text-stone-600 mt-2 line-clamp-2">{selectedReview.notes}</p>
                )}
                <p className="text-xs text-stone-400 mt-2">
                  by {selectedReview.user.username}
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {reviews.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/90 p-6 rounded-xl">
                <p className="text-stone-600 mb-4">No reviews yet. Be the first!</p>
                <Link
                  href="/reviews/new"
                  className="bg-amber-700 text-white px-6 py-3 rounded-xl inline-block"
                >
                  Add First Review
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-stone-600 mb-4">No reviews yet. Be the first!</p>
              <Link
                href="/reviews/new"
                className="bg-amber-700 text-white px-6 py-3 rounded-xl inline-block"
              >
                Add First Review
              </Link>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {review.photo_urls?.[0] && (
                  <img
                    src={review.photo_urls[0]}
                    alt={review.bourbon.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{review.bourbon.name}</h3>
                      <p className="text-sm text-stone-500">{review.location_name}</p>
                    </div>
                    <div className="text-amber-500">
                      {'★'.repeat(review.rating)}
                      {'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  
                  {review.notes && (
                    <p className="text-stone-600 mt-3">{review.notes}</p>
                  )}
                  
                  <div className="flex items-center mt-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-semibold">
                        {review.user.username[0].toUpperCase()}
                      </div>
                      <span className="text-sm text-stone-600">{review.user.username}</span>
                    </div>
                    <span className="ml-auto text-xs text-stone-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  )
}
