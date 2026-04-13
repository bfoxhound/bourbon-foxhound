import Link from 'next/link'
import { GlassWater, Map, User, Search, Target, Compass, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
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
              <Link href="/reviews" className="text-stone-600 hover:text-amber-700 transition-colors">
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
      <section className="relative bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-amber-400 font-medium mb-4 tracking-wide uppercase text-sm">Intel, not ego.</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              The intelligence
              <span className="text-amber-400"> network</span> for bourbon hunters.
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 mb-8 leading-relaxed">
              Whether you're chasing your first Weller or your fiftieth Pappy, 
              get the intel that matters. No posturing. No gatekeeping. Just the hunt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup"
                className="bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-700 transition-colors text-center"
              >
                Join the Inner Circle
              </Link>
              <Link 
                href="/feed"
                className="bg-white/10 text-white backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors text-center"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Three Demographics */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              The Hunt is for everyone.
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Whether you're building a cellar, climbing the ranks, or just getting started— 
              you deserve the same intel the insiders have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<Target className="h-8 w-8" />}
              title="For the Deep Cellar"
              subtitle="You don't need another bottle. You need to know where the next one is."
              description="Track allocated releases before they hit secondary markets. Get logistics intel from distributors. Know which stores got the surprise drop."
              cta="Get the Edge"
            />
            <ValueCard 
              icon={<Compass className="h-8 w-8" />}
              title="For the Climber"
              subtitle='The difference between "I got lucky" and "I knew."'
              description="Stop wandering aisles hoping. Get alerts 24-48 hours ahead of public announcements. Build your collection with intention, not impulse."
              cta="Hunt Smarter"
            />
            <ValueCard 
              icon={<BookOpen className="h-8 w-8" />}
              title="For the Curious"
              subtitle="Bourbon shouldn't require a secret handshake."
              description="We translate the noise into plain English. Learn what matters, ignore what doesn't, and find your first great bottle without the attitude."
              cta="Start Here"
            />
          </div>
        </div>
      </section>

      {/* The Hunt Explained */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-medium mb-4 tracking-wide uppercase text-sm">The Hunt</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Hunt isn't about showing off. It's about showing up informed.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <HuntFeature 
              title="Drop Tracking"
              description="Know when Stagg, Weller, and Van Winkle hit shelves—not just 'sometime this fall.'"
            />
            <HuntFeature 
              title="Rumor Intel"
              description="Logistics chatter from distributors, verified by our network of scouts."
            />
            <HuntFeature 
              title="Shelf Locations"
              description="Real-time reports from the field: which stores have it, which don't."
            />
            <HuntFeature 
              title="Release History"
              description="See patterns. Know which drops repeat, which are one-offs."
            />
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Join the Inner Circle
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Three levels. Same intel. Pick what fits your hunt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Scout - Free */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Scout</h3>
                <p className="text-stone-500">For the curious</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-stone-900">Free</span>
              </div>
              <ul className="space-y-3 mb-8 text-stone-600">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Public release calendar
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Basic drop alerts
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Community reports
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  3 foundational courses
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-xl border-2 border-stone-300 text-stone-700 font-semibold hover:border-amber-600 hover:text-amber-700 transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Tracker - Most Popular */}
            <div className="bg-white rounded-2xl p-8 border-2 border-amber-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Tracker</h3>
                <p className="text-stone-500">For the serious collector</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-stone-900">$9</span>
                <span className="text-stone-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-stone-600">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Everything in Scout, plus:
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Early intel (24-48hr advance notice)
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Location-specific alerts
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Cellar management tools
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">✓</span>
                  Monthly market brief
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Hunter */}
            <div className="bg-stone-900 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Hunter</h3>
                <p className="text-stone-400">For the portfolio builder</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-stone-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-stone-300">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  Everything in Tracker, plus:
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  Distillery allocation access
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  Secondary market price tracking
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  Private trade network
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  Monthly virtual tastings
                </li>
              </ul>
              <Link 
                href="/signup"
                className="block w-full text-center py-3 rounded-xl bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              From the Field
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Testimonial 
              quote="I've been collecting for fifteen years. The Fox and Hound tells me what my distributor friends used to—without the politics."
              author="Marcus T."
              location="Louisville"
            />
            <Testimonial 
              quote="Finally, a bourbon resource that doesn't make me feel like an idiot for asking questions."
              author="Sarah K."
              location="Chicago"
            />
            <Testimonial 
              quote="Got my first Blanton's because of the early alerts. Now I'm hooked—and I actually understand why."
              author="James R."
              location="Austin"
            />
          </div>
        </div>
      </section>

      {/* Live Feed Preview */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Latest Drops</h2>
            <p className="text-stone-600">Real-time bourbon intelligence, updated twice daily</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 h-[500px] overflow-hidden">
            <iframe 
              src="https://bfoxhound.github.io/bourbon-foxhound-data/bourbon-feed.html"
              className="w-full h-full border-0"
              title="Bourbon Feed"
            />
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/feed"
              className="text-amber-700 font-semibold hover:text-amber-800"
            >
              View Full Feed →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-amber-900 via-stone-900 to-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The bottle doesn't care about your pedigree.
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            Bourbon is for drinking, collecting, gifting, or flipping. Whatever your reason, 
            you deserve the same information the insiders have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Join the Inner Circle
            </Link>
            <Link 
              href="/feed"
              className="bg-white/10 text-white backdrop-blur-sm px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              See Membership Options
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
            <p className="text-sm">© 2026 BourbonFoxhound. Open the damn bottle.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ValueCard({ icon, title, subtitle, description, cta }: { 
  icon: React.ReactNode
  title: string 
  subtitle: string
  description: string 
  cta: string
}) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-amber-700 font-medium text-sm mb-3 italic">{subtitle}</p>
      <p className="text-stone-600 leading-relaxed mb-4">{description}</p>
      <Link href="/signup" className="text-amber-700 font-semibold hover:text-amber-800 text-sm">
        {cta} →
      </Link>
    </div>
  )
}

function HuntFeature({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-stone-400">{description}</p>
    </div>
  )
}

function Testimonial({ quote, author, location }: { quote: string; author: string; location: string }) {
  return (
    <div className="bg-stone-50 rounded-2xl p-8">
      <p className="text-stone-700 italic mb-6 leading-relaxed">"{quote}"</p>
      <div>
        <p className="font-semibold text-stone-900">{author}</p>
        <p className="text-stone-500 text-sm">{location}</p>
      </div>
    </div>
  )
}
