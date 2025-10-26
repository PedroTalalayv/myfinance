import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
                <div className="container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
                    {/* Text Content */}
                    <div className="max-w-2xl text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Controle suas <span className="text-orange-400">finanças</span> de forma inteligente
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                            Descubra como é ter controle total sobre seu dinheiro. Com o MyFinance, você finalmente entende para onde seu dinheiro está indo e toma as rédeas do seu futuro financeiro.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link 
                                to="/lancamentos"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg text-center"
                            >
                                Teste Grátis
                            </Link>
                            <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                                Ver Demonstração
                            </button>
                        </div>
                    </div>
                    
                    {/* Image */}
                    <div className="flex justify-center lg:justify-end">
                        <img 
                            src="/dashboard.jpg" 
                            alt="Dashboard MyFinance"
                            className="max-w-full lg:max-w-2xl rounded-2xl shadow-2xl border-4 border-white/10"
                        />
                    </div>
                </div>
            </section>

            {/* Investidores Section */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 py-20 px-8">
                <div className="text-center mb-16 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Junte-se aos que já <span className="text-green-400">transformaram</span> suas vidas
                    </h2>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                        Pessoas reais, resultados reais. Veja como nossos usuários alcançaram a liberdade financeira que sempre sonharam.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {[
                        { name: "Liews Ramilton", role: "Consultor de Vendas", achievement: "+40% em investimentos" },
                        { name: "Oscar Piastri", role: "Corretor Imobiliário", achievement: "Primeiro imóvel adquirido" },
                        { name: "Lando Norris", role: "Advogado", achievement: "Aposentadoria antecipada" }
                    ].map((person, index) => (
                        <div 
                            key={index}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-500 border border-white/20"
                        >
                            <div className="relative inline-block mb-6">
                                <img
                                    src="/profile.jpg" 
                                    alt={person.name}
                                    className="w-28 h-28 rounded-full mx-auto border-4 border-orange-400/50 shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                    ✓
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{person.name}</h3>
                            <p className="text-orange-300 font-semibold mb-3">{person.role}</p>
                            <p className="text-green-400 text-sm font-medium bg-green-400/10 rounded-full py-1 px-3 inline-block">
                                {person.achievement}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-20 px-8">
                <div className="max-w-4xl text-center bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 mx-auto border border-white/20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Seu futuro financeiro <span className="text-yellow-300">começa agora</span>
                    </h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Não espere mais para tomar controle da sua vida financeira. O momento de mudar é hoje.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link 
                            to="/planos"
                            className="bg-white hover:bg-gray-100 text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl min-w-[200px] text-center"
                        >
                            Ver Planos
                        </Link>
                        <Link 
                            to="/lancamentos"
                            className="border-2 border-white hover:bg-white hover:text-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 min-w-[200px] text-center"
                        >
                            Teste Grátis
                        </Link>
                    </div>
                    <p className="text-white/70 text-sm mt-8">
                        ⚡ Comece agora mesmo • Sem compromisso • Cancelamento gratuito
                    </p>
                </div>
            </section>
        </div>
    );
}