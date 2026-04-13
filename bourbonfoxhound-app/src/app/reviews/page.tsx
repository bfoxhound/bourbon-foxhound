'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GlassWater, ExternalLink, Star, Search, Filter, BookOpen, TrendingUp, Award, Clock } from 'lucide-react'

// External bourbon review sources
const reviewSources = [
  {
    name: "Breaking Bourbon",
    url: "https://breakingbourbon.com",
    description: "The #1 authority in bourbon & American whiskey. Capsule reviews and in-depth analysis.",
    featured: true,
    recentReviews: [
      { title: "Jack Daniel's 12 Year Tennessee Whiskey (Batch 4)", rating: 4.5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Barrell Bourbon Cigar Blend", rating: 4.5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Knob Creek Blender's Edition 01 Bourbon", rating: 4, date: "2025 Release", reviewed: "Apr 2026" }
    ]
  },
  {
    name: "The Bourbon Culture",
    url: "https://thebourbonculture.com",
    description: "Deep dives into dusty bourbons, allocated releases, and distillery profiles.",
    featured: true,
    recentReviews: [
      { title: "Stitzel-Weller Old Cabin Still Bourbon (1972)", rating: 5, date: "1972 Release", reviewed: "Apr 2026" },
      { title: "Old Grand-Dad Bottled in Bond (1958-1963)", rating: 5, date: "1960s Release", reviewed: "Apr 2026" },
      { title: "King of Kentucky Single Barrel 2024", rating: 5, date: "2024 Release", reviewed: "Apr 2026" }
    ]
  },
  {
    name: "The Whiskey Wash",
    url: "https://thewhiskeywash.com",
    description: "Industry news, awards, and expert reviews from around the whiskey world.",
    featured: true,
    recentReviews: [
      { title: "Old Fitzgerald Bottled-in-Bond 25th Anniversary", rating: 5, date: "2024 Release", award: "Whisky of the Year", reviewed: "Apr 2026" },
      { title: "Yellowstone Limited Edition 2024", rating: 4.5, date: "2024 Release", reviewed: "Apr 2026" },
      { title: "Milam & Greene Bottled-in-Bond", rating: 4.5, date: "2024 Release", reviewed: "Apr 2026" }
    ]
  },
  {
    name: "Bourbon & Banter",
    url: "https://www.bourbonbanter.com",
    description: "Honest, unfiltered reviews and bourbon culture commentary since 2010.",
    featured: false,
    recentReviews: [
      { title: "2025 King of Kentucky Bourbon (17-Year)", rating: 5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Maker's Mark Cellar Aged 2025", rating: 4.5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Four Roses 2025 Limited Edition", rating: 4.5, date: "2025 Release", reviewed: "Apr 2026" }
    ]
  },
  {
    name: "WhiskeyBon",
    url: "https://whiskeybon.com",
    description: "Curated lists, awards, and recommendations from budget to high-end.",
    featured: false,
    recentReviews: [
      { title: "W.L. Weller (BTAC) - Best Overall", rating: 5, date: "2026 Release", reviewed: "Apr 2026" },
      { title: "Elijah Craig 12 - Best Small Batch", rating: 4.5, date: "2026 Release", reviewed: "Apr 2026" },
      { title: "Colonel EH Taylor Bottled in Bond", rating: 4.5, date: "2026 Release", reviewed: "Apr 2026" }
    ]
  },
  {
    name: "CaskX",
    url: "https://caskx.com/blog",
    description: "Investment-focused bourbon insights and top releases of the year.",
    featured: false,
    recentReviews: [
      { title: "Bardstown Bourbon Co. Normandie Calvados Finish", rating: 5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Heaven Hill Master Distillers Unity", rating: 5, date: "2025 Release", reviewed: "Apr 2026" },
      { title: "Bomberger's PFG (Michter's)", rating: 4.5, date: "2025 Release", reviewed: "Apr 2026" }
    ]
  }
]

// Aggregated featured reviews
const featuredReviews = [
  {
    bourbon: "Old Fitzgerald Bottled-in-Bond 25th Anniversary",
    distillery: "Heaven Hill",
    source: "The Whiskey Wash",
    sourceUrl: "https://thewhiskeywash.com",
    rating: 10,
    award: "Whisky of the Year 2024",
    notes: "Cinnamon toast, nutmeg, allspice, oak, honey, vanilla. A legendary 13-year expression.",
    price: "$2,035",
    tags: ["Limited Edition", "Wheated", "13 Year"],
    releaseYear: "2024",
    reviewedDate: "Apr 2026"
  },
  {
    bourbon: "Jack Daniel's 12 Year Tennessee Whiskey (Batch 4)",
    distillery: "Jack Daniel's",
    source: "Breaking Bourbon",
    sourceUrl: "https://breakingbourbon.com",
    rating: 4.5,
    notes: "Bold, age-forward sip with sweet aged oak taking center stage. Classic cherry notes still linger.",
    price: "$80-100",
    tags: ["Tennessee Whiskey", "12 Year", "Batch Release"],
    releaseYear: "2025",
    reviewedDate: "Apr 2026"
  },
  {
    bourbon: "King of Kentucky Single Barrel 2024",
    distillery: "Brown-Forman",
    source: "The Bourbon Culture",
    sourceUrl: "https://thebourbonculture.com",
    rating: 5,
    notes: "Cherry cordials, caramel, seasoned oak, cinnamon-spiced cherries, blackberry jam, Thin Mints.",
    price: "$250+",
    tags: ["Single Barrel", "Allocated", "15+ Year"],
    releaseYear: "2024",
    reviewedDate: "Apr 2026"
  },
  {
    bourbon: "Stitzel-Weller Old Cabin Still Bourbon (1972)",
    distillery: "Stitzel-Weller (Dusty)",
    source: "The Bourbon Culture",
    sourceUrl: "https://thebourbonculture.com",
    rating: 5,
    notes: "Werther's Originals, peppermint, fresh varnish, zested citrus. Tobacco, varnished oak, chocolate torte.",
    price: "Auction",
    tags: ["Dusty", "Wheated", "Decanter", "1970s"],
    releaseYear: "1972",
    reviewedDate: "Apr 2026"
  },
  {
    bourbon: "Yellowstone Limited Edition 2024",
    distillery: "Limestone Branch",
    source: "The Whiskey Wash",
    sourceUrl: "https://thewhiskeywash.com",
    rating: 4.5,
    notes: "Pear, panela, ripe apple, leather, basswood honey. Finished in French brandy and cognac casks.",
    price: "$115",
    tags: ["Limited Edition", "Finished", "101 Proof"],
    releaseYear: "2024",
    reviewedDate: "Apr 2026"
  },
  {
    bourbon: "Four Roses 2025 Limited Edition Small Batch",
    distillery: "Four Roses",
    source: "Bourbon & Banter",
    sourceUrl: "https://www.bourbonbanter.com",
    rating: 4.5,
    notes: "Dried flowers, baked pastry, allspice, classic Juicy Fruit gum bomb. Masterful blending.",
    price: "$180+",
    tags: ["Limited Edition", "Small Batch", "Allocated"],
    releaseYear: "2025",
    reviewedDate: "Apr 2026"
  }
]

// Categories for filtering
const categories = ["All", "Limited Edition", "Dusty", "Wheated", "High Rye", "Finished", "Single Barrel", "Best Value"]

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReviews = featuredReviews.filter(review => {
    const matchesCategory = activeCategory === "All" || review.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()))
    const matchesSearch = review.bourbon.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.distillery.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/feed" className="flex items-center space-x-2">
              <GlassWater className="h-8 w-8 text-amber-700" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-stone-900 leading-tight">BourbonFoxhound</span>
                <span className="text-xs text-stone-500 italic">Intel, not ego.</span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/feed" className="text-stone-600 hover:text-amber-700 transition-colors">
                The Hunt
              </Link>
              <Link href="/reviews" className="text-amber-700 font-medium transition-colors">
                The Hound
              </Link>
              <Link href="/map" className="text-stone-600 hover:text-amber-700 transition-colors">
                Map
              </Link>
              <Link href="/learn" className="text-stone-600 hover:text-amber-700 transition-colors">
                Learn
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-stone-600 hover:text-amber-700 transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
              >
                Join the Hunt
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-amber-400 font-medium mb-4 tracking-wide uppercase text-sm">The Hound</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Curated Reviews from the
              <span className="text-amber-400"> Bourbon Web</span>
            </h1>
            <p className="text-xl text-stone-300 mb-8">
              We track the best reviews from across the bourbon internet—Breaking Bourbon, 
              The Whiskey Wash, Bourbon & Banter, and more. All in one place.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bourbons, distilleries, or reviews..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="h-5 w-5 text-stone-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-stone-900 flex items-center">
              <TrendingUp className="h-6 w-6 text-amber-700 mr-2" />
              Latest Reviews
            </h2>
            <span className="text-stone-500 text-sm">
              {filteredReviews.length} reviews found
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {review.source}
                      </span>
                      {review.award && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {review.award}
                        </span>
                      )}
                    </div>
                    <a 
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-amber-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-1">
                    {review.bourbon}
                  </h3>
                  <p className="text-sm text-stone-500 mb-1">{review.distillery}</p>
                  <p className="text-xs text-stone-400 mb-4 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {review.releaseYear} Release • Reviewed {review.reviewedDate}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-current' : 'text-stone-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-stone-700">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Notes */}
                  <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                    {review.notes}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-lg font-bold text-amber-700">{review.price}</span>
                    <a 
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 text-sm font-medium hover:underline flex items-center"
                    >
                      Read Full Review
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Sources */}
      <section className="py-12 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-8 flex items-center">
            <BookOpen className="h-6 w-6 text-amber-700 mr-2" />
            Sources We Track
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewSources.map((source, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-6 border transition-shadow hover:shadow-md ${
                  source.featured ? 'border-amber-300 ring-1 ring-amber-100' : 'border-stone-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-stone-900">{source.name}</h3>
                  {source.featured && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-stone-600 text-sm mb-4">
                  {source.description}
                </p>

                {/* Recent Reviews Preview */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-stone-400 uppercase">Recent Reviews</p>
                  {source.recentReviews.slice(0, 2).map((review, i) => (
                    <div key={i} className="text-sm">
                      <p className="text-stone-700 truncate">{review.title}</p>
                      <div className="flex items-center text-xs text-stone-500">
                        <Star className="h-3 w-3 text-amber-400 fill-current mr-1" />
                        {review.rating}/5
                        <span className="ml-2">{review.date}</span>
                        <span className="ml-2 text-stone-400">• Reviewed {review.reviewed}</span>
                        {review.award && (
                          <span className="ml-2 text-amber-600">• {review.award}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 text-sm font-medium hover:underline flex items-center"
                >
                  Visit {source.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to add your own reviews?
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            Join the community and share your tasting notes, ratings, and hunt stories 
            with fellow bourbon enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Join the Inner Circle
            </Link>
            <Link 
              href="/map"
              className="bg-white/10 text-white backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Browse the Map
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GlassWater className="h-6 w-6 text-amber-700" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-stone-200">BourbonFoxhound</span>
                <span className="text-xs text-stone-500 italic">Intel, not ego.</span>
              </div>
            </div>
            <p className="text-sm">© 2026 BourbonFoxhound. Reviews aggregated from external sources.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
