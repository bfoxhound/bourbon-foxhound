import Link from 'next/link'
import { BookOpen, Droplets, MapPin, Award, ChevronRight, Lock } from 'lucide-react'

const lessons = [
  {
    id: 'what-is-bourbon',
    title: 'What is Bourbon?',
    description: 'Learn the legal definition and what makes bourbon unique',
    icon: BookOpen,
    free: true,
    readTime: '3 min'
  },
  {
    id: 'tasting-guide',
    title: 'How to Taste Bourbon',
    description: 'Master the 5 S\'s: See, Swirl, Sniff, Sip, Savor',
    icon: Droplets,
    free: true,
    readTime: '5 min'
  },
  {
    id: 'mashbills',
    title: 'Understanding Mashbills',
    description: 'Corn vs. Rye vs. Wheat - how grains change flavor',
    icon: BookOpen,
    free: true,
    readTime: '4 min'
  },
  {
    id: 'distillery-guide',
    title: 'Major Distilleries',
    description: 'Profiles of Buffalo Trace, Heaven Hill, Makers Mark, and more',
    icon: MapPin,
    free: false,
    readTime: '8 min'
  },
  {
    id: 'label-reading',
    title: 'How to Read a Label',
    description: 'Age statements, proof, and what they mean for your wallet',
    icon: BookOpen,
    free: false,
    readTime: '4 min'
  },
  {
    id: 'collecting',
    title: 'Collecting vs. Drinking',
    description: 'The hunt, secondary market, and our advice for beginners',
    icon: Award,
    free: false,
    readTime: '6 min'
  }
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/feed" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-amber-700" />
            <span className="font-bold">Learn</span>
          </Link>
          
          <Link
            href="/signup"
            className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-800"
          >
            Get Full Access
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-800 to-stone-900 rounded-2xl p-8 md:p-12 text-white mb-12">
          <p className="text-amber-400 font-medium text-sm italic mb-4">Intel, not ego.</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Master Bourbon
          </h1>
          <p className="text-lg text-stone-200 max-w-2xl mb-6">
            From your first sip to rare bottle hunting, our guides help you 
            understand, taste, and appreciate America's native spirit. 
            No secret handshakes required.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              🥃 Beginner friendly
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              📚 6 courses
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ⏱️ 30 min total
            </span>
          </div>
        </div>

        {/* Progress for logged in users */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Your Progress</h2>
            <span className="text-sm text-stone-500">0 of 6 completed</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div className="bg-amber-600 h-2 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>

        {/* Lesson Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon
            return (
              <Link
                key={lesson.id}
                href={lesson.free ? `/learn/${lesson.id}` : '/signup'}
                className={`bg-white rounded-xl p-6 border transition group ${
                  lesson.free 
                    ? 'border-stone-200 hover:border-amber-300 hover:shadow-md' 
                    : 'border-stone-200 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    lesson.free ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {!lesson.free && (
                    <div className="flex items-center text-stone-400">
                      <Lock className="h-4 w-4 mr-1" />
                      <span className="text-xs">Premium</span>
                    </div>
                  )}
                  
                  {lesson.free && (
                    <span className="text-xs text-green-600 font-medium">
                      Free
                    </span>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-700 transition">
                  {lesson.title}
                </h3>
                
                <p className="text-stone-600 text-sm mb-4">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">
                    {lesson.readTime} read
                  </span>
                  
                  <ChevronRight className={`h-5 w-5 transition ${
                    lesson.free ? 'text-amber-700' : 'text-stone-300'
                  }`} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-100 to-stone-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Unlock Everything</h2>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto">
            Get full access to all courses, personalized recommendations, 
            price alerts, and advanced tasting notes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-center">
              <span className="text-3xl font-bold">$4.99</span>
              <span className="text-stone-500">/month</span>
            </div>
            
            <Link
              href="/signup"
              className="bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
            >
              Start Free Trial
            </Link>
          </div>
          
          <p className="text-sm text-stone-500 mt-4">
            Cancel anytime. 7-day free trial.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked</h2>
          
          <div className="space-y-4">
            <FAQItem 
              question="Do I need to know anything about bourbon to start?"
              answer="Not at all. Our Bourbon 101 course assumes zero knowledge. We'll teach you everything from what makes bourbon 'bourbon' to how to taste like a pro."
            />
            
            <FAQItem 
              question="What's the difference between free and premium?"
              answer="Free gets you 3 foundational courses. Premium unlocks all 6 courses plus price drop alerts, early access to limited release news, and advanced tasting notes."
            />
            
            <FAQItem 
              question="Will this help me find allocated bottles like Pappy?"
              answer="We'll teach you how the allocation system works and how to build relationships with stores. No guarantees, but you'll have a better shot than most."
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-stone-600">{answer}</p>
    </div>
  )
}
