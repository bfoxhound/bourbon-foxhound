import Link from 'next/link'
import { ArrowLeft, MapPin, Star, Camera } from 'lucide-react'

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-stone-600" />
              <span className="text-stone-600">Back</span>
            </Link>
            <h1 className="text-xl font-bold">Discover</h1>
            <Link 
              href="/reviews/new"
              className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-800"
            >
              Add Review
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h2 className="text-lg font-semibold">Latest Drops & News</h2>
                <p className="text-sm text-stone-500 mt-1">Curated by our AI agents, updated twice daily</p>
              </div>
              <div className="h-[600px]">
                <iframe 
                  src="https://bfoxhound.github.io/bourbon-foxhound-data/bourbon-feed.html"
                  className="w-full h-full border-0"
                  title="Bourbon Feed"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors">
                  <Camera className="h-5 w-5 text-amber-700" />
                  <span>Post a Review</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors">
                  <MapPin className="h-5 w-5 text-amber-700" />
                  <span>Check In Location</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors">
                  <Star className="h-5 w-5 text-amber-700" />
                  <span>Rate a Bourbon</span>
                </button>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <h3 className="font-semibold mb-4">Trending Now</h3>
              <div className="space-y-4">
                <TrendingItem 
                  rank={1}
                  name="Old Forester Birthday Bourbon 2025"
                  reviews={342}
                />
                <TrendingItem 
                  rank={2}
                  name="Four Roses Limited Edition"
                  reviews={298}
                />
                <TrendingItem 
                  rank={3}
                  name="Parker's Heritage Collection"
                  reviews={187}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function TrendingItem({ rank, name, reviews }: { rank: number, name: string, reviews: number }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 text-sm font-semibold">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-900 truncate">{name}</p>
        <p className="text-xs text-stone-500">{reviews} reviews this week</p>
      </div>
    </div>
  )
}
