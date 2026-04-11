'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, MapPin, Star, X, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// You'll need to set this in your .env.local
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export default function NewReviewPage() {
  const router = useRouter()
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  const [bourbonName, setBourbonName] = useState('')
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState({ lat: 39.8283, lng: -98.5795 }) // Center of US
  const [locationName, setLocationName] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userLocationLoading, setUserLocationLoading] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [location.lng, location.lat],
      zoom: 3
    })

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat
      setLocation({ lat, lng })
      
      if (marker.current) {
        marker.current.setLngLat([lng, lat])
      } else {
        marker.current = new mapboxgl.Marker({ color: '#b45309' })
          .setLngLat([lng, lat])
          .addTo(map.current!)
      }
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  // Update marker when location changes
  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLngLat([location.lng, location.lat])
      map.current.flyTo({ center: [location.lng, location.lat], zoom: 12 })
    }
  }, [location])

  const getCurrentLocation = () => {
    setUserLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setUserLocationLoading(false)
      },
      (err) => {
        console.error('Geolocation error:', err)
        setError('Could not get your location')
        setUserLocationLoading(false)
      }
    )
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // 1. Upload photo if exists
      let photoUrl = null
      if (photo) {
        const fileExt = photo.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('review-photos')
          .upload(fileName, photo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('review-photos')
          .getPublicUrl(fileName)
        
        photoUrl = publicUrl
      }

      // 2. Find or create bourbon
      const { data: existingBourbon } = await supabase
        .from('bourbons')
        .select('id')
        .ilike('name', bourbonName)
        .single()

      let bourbonId = existingBourbon?.id

      if (!bourbonId) {
        const { data: newBourbon, error: bourbonError } = await supabase
          .from('bourbons')
          .insert({ name: bourbonName })
          .select('id')
          .single()

        if (bourbonError) throw bourbonError
        bourbonId = newBourbon.id
      }

      // 3. Create review
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          bourbon_id: bourbonId,
          rating,
          notes: notes || null,
          location_name: locationName || null,
          location_lat: location.lat,
          location_lng: location.lng,
          photo_urls: photoUrl ? [photoUrl] : []
        })

      if (reviewError) throw reviewError

      router.push('/map')
      router.refresh()

    } catch (err: any) {
      setError(err.message || 'Failed to create review')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/feed" className="flex items-center text-stone-600">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Cancel
          </Link>
          <h1 className="font-semibold">New Review</h1>
          <div className="w-16"></div>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Photo Upload */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-stone-700 mb-3">
            Photo
          </label>
          
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => { setPhoto(null); setPhotoPreview(null) }}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:bg-stone-50 transition">
              <Camera className="h-10 w-10 text-stone-400 mb-2" />
              <span className="text-stone-500">Tap to add photo</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Bourbon Name */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Bourbon Name *
          </label>
          <input
            type="text"
            value={bourbonName}
            onChange={(e) => setBourbonName(e.target.value)}
            placeholder="e.g., Buffalo Trace"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
            required
          />
        </div>

        {/* Rating */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Rating *
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-stone-700">
              Location
            </label>
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={userLocationLoading}
              className="flex items-center text-sm text-amber-700 hover:text-amber-800 disabled:opacity-50"
            >
              <MapPin className="h-4 w-4 mr-1" />
              {userLocationLoading ? 'Getting location...' : 'Use my location'}
            </button>
          </div>
          
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="e.g., Jack's Bar, Louisville"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none mb-3"
          />
          
          <div
            ref={mapContainer}
            className="w-full h-64 rounded-xl overflow-hidden"
          />
          
          <p className="text-xs text-stone-500 mt-2">
            Tap on the map to set exact location
          </p>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Tasting Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you taste? How was the finish?"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !bourbonName || !rating}
          className="w-full bg-amber-700 text-white py-4 rounded-xl font-semibold text-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Post Review'
          )}
        </button>
      </form>
    </main>
  )
}
