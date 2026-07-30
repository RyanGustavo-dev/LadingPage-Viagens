// Dados centrais da Marcinho Viagens — altere aqui para atualizar o site inteiro.

const whatsappNumber = '5531987881993' // (31) 98788-1993, formato internacional sem símbolos
const whatsappDefaultMessage =
  'Olá! Vim pelo site da Marcinho Viagens e gostaria de saber mais sobre pacotes de viagens ✈️🚌'

const whatsappHref = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const site = {
  name: 'Marcinho Viagens',
  founded: '15 de abril de 2013',
  tagline: 'Sua próxima viagem começa aqui',
  description:
    'Agência de turismo completa em Ribeirão das Neves (Justinópolis), MG. Atuamos com pacotes de viagens, passagens aéreas e rodoviárias para diversos destinos no Brasil e no mundo, com atendimento personalizado, ágil e atencioso.',

  phones: {
    display: '(31) 98788-1993 / 3632-4433',
    landline: '+55 31 3632-4433',
    mobile: '+55 31 98788-1993',
    landlineHref: 'tel:+553136324433',
    mobileHref: 'tel:+5531987881993',
  },

  whatsapp: {
    number: whatsappNumber,
    message: whatsappDefaultMessage,
    href: whatsappHref(whatsappDefaultMessage),
  },

  instagram: {
    handle: '@marcinhoviagens',
    url: 'https://www.instagram.com/marcinhoviagens',
  },

  address: {
    line1: 'Av. Castelo Branco, 445 - Menezes (Justinópolis)',
    line2: 'Ribeirão das Neves - MG, 33913-280, Brasil',
    mapsUrl:
      'https://www.google.com/maps/search/Av.%20Castelo%20Branco%2C%20445%20-%20Menezes%20(Justin%C3%B3polis)%2C%20Ribeir%C3%A3o%20das%20Neves%20-%20MG%2C%2033913-280%2C%20Brasil/@-19.7743,-44.0241,17z?hl=en',
    embedUrl:
      'https://www.google.com/maps?q=Av.+Castelo+Branco,+445+-+Menezes+(Justin%C3%B3polis),+Ribeir%C3%A3o+das+Neves+-+MG,+33913-280,+Brasil&hl=pt-BR&z=16&output=embed',
  },

  reviews: {
    rating: 5.0,
    reviewCount: 132,
    googleReviewUrl: 'https://share.google/BA2JcP1Gp7azruMoP',
    items: [
      {
        author: 'W.',
        rating: 5,
        date: '',
        text: 'Hotel perfeito: recepção, atendimento, comida, quarto.',
      },
    ],
  },

  services: [
    {
      title: 'Pacotes de Viagem',
      description:
        'Roteiros completos pelo Brasil e pelo mundo, planejados com cuidado do início ao fim.',
      icon: 'package',
    },
    {
      title: 'Passagens Aéreas',
      description:
        'Cotação e emissão de voos nacionais e internacionais nas melhores condições.',
      icon: 'plane',
    },
    {
      title: 'Passagens Rodoviárias',
      description:
        'Passagens de ônibus para diversos destinos, com praticidade e agilidade na compra.',
      icon: 'bus',
    },
    {
      title: 'Atendimento Personalizado',
      description:
        'Orientação próxima e humana, para uma experiência prática, segura e inesquecível.',
      icon: 'heart',
    },
  ],

  highlights: [
    {
      tag: 'Hospedagem',
      title: 'Hotéis e Resorts',
      description:
        'Os mais belos e luxuosos resorts estão aqui. Conheça e faça sua reserva com um de nossos agentes.',
      icon: 'hotel',
      image: 'imagens/hoteis.jpeg',
      whatsappHref: whatsappHref('Olá! Gostaria de conhecer as opções de hotéis e resorts.'),
    },
    {
      tag: 'Internacional',
      title: 'Pacotes Internacionais',
      description:
        'Europa, América do Norte, América do Sul, Ásia, Oceania. Escolha seu destino!',
      icon: 'globe',
      image: 'imagens/aviao.png',
      whatsappHref: whatsappHref('Olá! Gostaria de saber mais sobre os pacotes internacionais.'),
    },
    {
      tag: 'Escapadas',
      title: 'Fim de Semana Legal',
      description:
        'Está sem programa para o fim de semana? Que tal uma pousada romântica ou um hotel fazenda?',
      icon: 'calendar',
      image: 'imagens/hoteis.jpeg',
      whatsappHref: whatsappHref('Olá! Gostaria de dicas para um fim de semana especial.'),
    },
  ],

  // Fotos reais ainda não recebidas — cada destino usa um cartão com ícone
  // e gradiente até que uma imagem seja enviada. Basta preencher `image`
  // com o caminho do arquivo em `public/destinos/` (ex.: '/destinos/cabo-frio.jpg').
  destinations: [
    {
      name: 'Cabo Frio',
      state: 'RJ',
      tagline: 'Praias e lagoas cristalinas na Região dos Lagos',
      icon: 'wave',
      image: '/imagens/cabofrio.jpg',
      whatsappHref: whatsappHref('Olá! Gostaria de saber o valor do pacote para Cabo Frio 🏖️'),
    },
    {
      name: 'Caldas Novas',
      state: 'GO',
      tagline: 'Parques aquáticos e as águas termais mais quentes do Brasil',
      icon: 'droplet',
      image: '/imagens/caldasnovas.jpeg',
      whatsappHref: whatsappHref('Olá! Gostaria de saber o valor do pacote para Caldas Novas ♨️'),
    },
    {
      name: 'Aparecida do Norte',
      state: 'SP',
      tagline: 'Fé e turismo religioso na maior basílica mariana do mundo',
      icon: 'church',
      image: 'imagens/aparecidanorte.jpg',
      whatsappHref: whatsappHref(
        'Olá! Gostaria de saber o valor do pacote para Aparecida do Norte 🙏'
      ),
    },
  ],
}
