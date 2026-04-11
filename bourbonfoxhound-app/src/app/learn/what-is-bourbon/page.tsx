import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'

export default function WhatIsBourbonPage() {
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
            <span>3 min read</span>
            <span>•</span>
            <span className="text-green-600 font-medium">Free Lesson</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            What is Bourbon?
          </h1>
          
          <p className="text-xl text-stone-600">
            Understanding the legal definition and what makes bourbon America's native spirit.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8">
            <p className="font-medium text-amber-900 m-0">
              🎯 The Short Answer: Bourbon is a type of American whiskey made primarily from corn 
              and aged in new charred oak barrels.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The Legal Definition</h2>
          
          <p className="text-stone-700 leading-relaxed mb-4">
            Bourbon has a strict legal definition governed by the U.S. government. To be called bourbon, 
            a whiskey must meet <strong>all</strong> of these requirements:
          </p>

          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-stone-700">
              <strong>Made in the USA</strong> — Contrary to popular belief, bourbon doesn't have to be 
              from Kentucky. It can be made anywhere in the United States.
            </li>
            
            <li className="text-stone-700">
              <strong>At least 51% corn</strong> in the mashbill (grain recipe). Most bourbons use 
              60-80% corn.
            </li>
            
            <li className="text-stone-700">
              <strong>Aged in new, charred oak barrels</strong>. The barrel must be brand new 
              and have a charred interior. No exceptions.
            </li>
            
            <li className="text-stone-700">
              <strong>Distilled to no more than 160 proof</strong> (80% alcohol).
            </li>
            
            <li className="text-stone-700">
              <strong>Entered into the barrel at no more than 125 proof</strong>.
            </li>
            
            <li className="text-stone-700">
              <strong>Bottled at minimum 80 proof</strong> (40% alcohol).
            </li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">Common Misconceptions</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-semibold text-red-800 mb-2">❌ Myth</p>
              <p className="text-red-700 m-0">Bourbon must be made in Kentucky</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-800 mb-2">✅ Fact</p>
              <p className="text-green-700 m-0">Bourbon can be made in any US state</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-semibold text-red-800 mb-2">❌ Myth</p>
              <p className="text-red-700 m-0">Bourbon must be aged for years</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-800 mb-2">✅ Fact</p>
              <p className="text-green-700 m-0">No minimum age (unless labeled "straight")</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Bourbon vs. Other Whiskeys</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Grain Requirements</th>
                  <th className="text-left py-3 px-4">Barrel Requirements</th>
                  <th className="text-left py-3 px-4">Origin</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100 bg-amber-50">
                  <td className="py-3 px-4 font-medium">Bourbon</td>
                  <td className="py-3 px-4">≥51% corn</td>
                  <td className="py-3 px-4">New charred oak</td>
                  <td className="py-3 px-4">USA only</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 px-4 font-medium">Rye Whiskey</td>
                  <td className="py-3 px-4">≥51% rye</td>
                  <td className="py-3 px-4">New charred oak</td>
                  <td className="py-3 px-4">USA</td>
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="py-3 px-4 font-medium">Scotch</td>
                  <td className="py-3 px-4">Malted barley</td>
                  <td className="py-3 px-4">Used oak (often bourbon barrels)</td>
                  <td className="py-3 px-4">Scotland</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Irish Whiskey</td>
                  <td className="py-3 px-4">Malted barley + grains</td>
                  <td className="py-3 px-4">Various (often used)</td>
                  <td className="py-3 px-4">Ireland</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Kentucky Dominates</h2>
          
          <p className="text-stone-700 leading-relaxed mb-4">
            While bourbon <em>can</em> be made anywhere in the US, Kentucky produces about 
            <strong>95% of all bourbon</strong>. Here's why:
          </p>

          <ul className="space-y-3 list-disc list-inside">
            <li className="text-stone-700">
              <strong>Limestone water:</strong> Kentucky's water is naturally filtered through 
              limestone, removing iron (which ruins whiskey) and adding beneficial minerals.
            </li>
            
            <li className="text-stone-700">
              <strong>Climate:</strong> Hot summers and cold winters cause the bourbon to 
              expand into and contract out of the barrel wood, extracting more flavor.
            </li>
            
            <li className="text-stone-700">
              <strong>History:</strong> Kentucky has been distilling bourbon since the late 
              1700s. The knowledge and infrastructure are deeply rooted.
            </li>
            
            <li className="text-stone-700">
              <strong>Corn:</strong> Kentucky sits in the corn belt with easy access to 
              the primary ingredient.
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div />
            
            <Link
              href="/learn/tasting-guide"
              className="flex items-center bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800 transition"
            >
              Next: How to Taste Bourbon
              <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Complete CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-100 to-stone-100 rounded-2xl p-8 text-center">
          <CheckCircle className="h-12 w-12 text-amber-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Lesson Complete!</h3>          
          <p className="text-stone-600 mb-6">
            Continue your bourbon education with our next free lesson.
          </p>
          
          <Link
            href="/learn/tasting-guide"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
          >
            Continue Learning →
          </Link>
        </div>
      </article>
    </main>
  )
}
