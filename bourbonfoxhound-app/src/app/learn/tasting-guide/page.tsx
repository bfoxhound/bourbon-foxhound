import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'

export default function TastingGuidePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Link href="/learn" className="flex items-center text-stone-600">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Learn
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-stone-500 mb-4">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
            <span>•</span>
            <span className="text-green-600 font-medium">Free Lesson</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How to Taste Bourbon
          </h1>
          
          <p className="text-xl text-stone-600">
            Master the 5 S's: See, Swirl, Sniff, Sip, Savor. Taste bourbon like a pro.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8">
            <p className="font-medium text-amber-900 m-0">
              🥃 The Short Answer: Tasting bourbon is about engaging all your senses. 
              Take your time, use the right glass, and pay attention to what you experience.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The 5 S's of Bourbon Tasting</h2>

          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">See</h3>
                <p className="text-stone-700 mb-4">
                  Hold your glass up to the light. The color tells you about age and barrel char:
                </p>
                
                <ul className="space-y-2 list-disc list-inside text-stone-700">
                  <li><strong>Light straw/gold:</strong> Younger (2-4 years), lighter char</li>
                  <li><strong>Amber/copper:</strong> Middle-aged (6-10 years)</li>
                  <li><strong>Deep mahogany:</strong> Older (12+ years), heavy char</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">Swirl</h3>
                <p className="text-stone-700 mb-4">
                  Gently swirl the bourbon in your glass. This releases aromas and shows you the "legs":
                </p>
                
                <ul className="space-y-2 list-disc list-inside text-stone-700">
                  <li><strong>Fast legs (run quickly down the glass):</strong> Lower proof, lighter body</li>
                  <li><strong>Slow legs (thick, syrupy):</strong> Higher proof, more body, often older</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">Sniff</h3>
                <p className="text-stone-700 mb-4">
                  Smell is 80% of taste. Take several short sniffs rather than one big inhale:
                </p>
                
                <div className="bg-stone-50 rounded-lg p-4">
                  <p className="font-medium text-stone-900 mb-2">Common Bourbon Aromas:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>🍦 Vanilla</div>
                    <div>🍯 Caramel</div>
                    <div>🌰 Oak/Wood</div>
                    <div>🍎 Apple/Fruit</div>
                    <div>🍫 Chocolate</div>
                    <div>🍊 Citrus</div>
                    <div>🍒 Cherry</div>
                    <div>🌾 Grain/Corn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                4
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">Sip</h3>
                <p className="text-stone-700 mb-4">
                  Take a small amount and let it coat your entire tongue:
                </p>
                
                <ul className="space-y-2 list-disc list-inside text-stone-700">
                  <li>Don't gulp or shoot — this isn't college</li>
                  <li>Let it roll across your tongue to hit all taste buds</li>
                  <li>Note the initial flavors ("front of palate")</li>
                  <li>High proof bourbons (100+) may need a few drops of water</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xl">
                5
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">Savor</h3>
                <p className="text-stone-700 mb-4">
                  The finish is where complexity shows. After you swallow:
                </p>
                
                <ul className="space-y-2 list-disc list-inside text-stone-700">
                  <li><strong>How long does the flavor linger?</strong> (Short = 10 sec, Long = 1+ min)</li>
                  <li><strong>Does it evolve?</strong> Many bourbons change from sweet to spicy</li>
                  <li><strong>What's the " Kentucky hug"?</strong> The warm feeling in your chest — higher proof = bigger hug</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Right Glass Matters</h2>
          
          <p className="text-stone-700 mb-4">
            A proper tasting glass concentrates aromas:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-800 mb-2">✅ Best: Glencairn</p>
              <p className="text-green-700 text-sm">Tulip shape concentrates aromas. The standard for whiskey tasting.</p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Okay: Rocks Glass</p>
              <p className="text-yellow-700 text-sm">Wide opening loses aromas, but fine for casual drinking.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-semibold text-red-800 mb-2">❌ Avoid: Shot Glass</p>
              <p className="text-red-700 text-sm">No room for aromas. This is for shooting, not tasting.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Practice Makes Perfect</h2>
          
          <p className="text-stone-700 mb-4">
            The best way to develop your palate is to taste with intention:
          </p>

          <ul className="space-y-2 list-disc list-inside text-stone-700">
            <li>Keep a journal (or use our app!) to track what you taste</li>
            <li>Taste with friends — discussing flavors helps you identify them</li>
            <li>Try bourbons side by side to compare profiles</li>
            <li>Don't worry about "getting it wrong" — taste is subjective</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <Link
              href="/learn/what-is-bourbon"
              className="flex items-center text-stone-600 hover:text-amber-700"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Previous: What is Bourbon?
            </Link>
            
            <Link
              href="/learn"
              className="flex items-center bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition"
            >
              Back to All Lessons
              <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Complete CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-100 to-stone-100 rounded-2xl p-8 text-center">
          <CheckCircle className="h-12 w-12 text-amber-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Lesson Complete!</h3>          
          <p className="text-stone-600 mb-6">
            You've mastered the 5 S's. Ready to dive deeper?
          </p>
          
          <Link
            href="/signup"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
          >
            Unlock Premium Lessons →
          </Link>
        </div>
      </article>
    </main>
  )
}
