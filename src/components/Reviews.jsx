import React from 'react';

const Reviews = () => {
  return (
    <section id="avaliacoes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2D3142] mb-4">O que dizem nossos clientes</h2>
        </div>
        
        {/* Widget do Elfsight com as avaliações dinâmicas */}
        <div className="elfsight-app-f18ae089-a335-47f3-b6dd-e97e8ff3ebb1" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
};

export default Reviews;
