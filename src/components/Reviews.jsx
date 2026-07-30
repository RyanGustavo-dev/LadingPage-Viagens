import React from 'react';

const Reviews = () => {
  return (
    <section id="avaliacoes" className="bg-slate-50 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-3xl font-extrabold text-brand-blue-deep md:text-4xl">
            O que dizem nossos clientes
          </h2>
        </div>
        
        {/* Widget do Elfsight com as avaliações dinâmicas */}
        <div className="elfsight-app-f18ae089-a335-47f3-b6dd-e97e8ff3ebb1" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
};

export default Reviews;
