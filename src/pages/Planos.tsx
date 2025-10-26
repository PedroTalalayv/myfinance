import { useNavigate } from 'react-router-dom';

export default function Planos(){
    const navigate = useNavigate();

    const handleComprar = (planoId: string) => {
        navigate('/checkout', { state: { plano: planoId } });
    };

    return(
        <section id="planos" className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
            {/* Cabeçalho */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Escolha seu Plano
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Invista no seu futuro financeiro com planos que se adaptam às suas necessidades
                </p>
            </div>

            {/* Cards dos Planos */}
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    
                    {/* Plano PRO */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Plano PRO</h2>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-gray-900">R$ 29</span>
                                <span className="text-gray-600">/mês</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Controle de gastos ilimitado</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Relatórios detalhados</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Suporte por email</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => handleComprar('pro')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Comprar Agora
                        </button>
                    </div>

                    {/* Plano Premium */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-600 relative transform scale-105">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                MAIS POPULAR
                            </span>
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Plano Premium</h2>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-gray-900">R$ 49</span>
                                <span className="text-gray-600">/mês</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Todos os recursos PRO</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Investimentos automatizados</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Consultoria personalizada</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Suporte prioritário 24/7</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => handleComprar('premium')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Comprar Agora
                        </button>
                    </div>

                    {/* Plano Anual */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Plano Anual</h2>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold text-gray-900">R$ 399</span>
                                <span className="text-gray-600">/ano</span>
                            </div>
                            <p className="text-green-600 font-semibold mt-2">Economize 32%</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Todos os recursos Premium</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Relatórios avançados</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Treinamentos exclusivos</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="text-gray-700">Desconto vitalício</span>
                            </li>
                        </ul>
                        <button 
                            onClick={() => handleComprar('anual')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Comprar Agora
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}