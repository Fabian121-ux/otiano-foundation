import React from 'react'

function Quote() {
  return (
    <section className="bg-gray-100 py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <blockquote className="text-3xl md:text-4xl font-bold text-red-800 mb-8 leading-relaxed">
          "If you walk alone, you don't go far. If you walk with others, you travel further."
        </blockquote>
        <cite className="text-lg text-gray-700 font-medium">
          – Aigboje and Ofovwe Aig-Imoukhuede
        </cite>
      </div>
    </section>
  )
}

export default Quote