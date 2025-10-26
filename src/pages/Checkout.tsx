import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PlanoSelecionado {
    id: string;
    nome: string;
    preco: number;
    periodo: string;
    descricao: string;
}

interface FormData {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    numeroCartao: string;
    nomeCartao: string;
    validade: string;
    cvv: string;
}

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [plano, setPlano] = useState<PlanoSelecionado | null>(null);
    const [etapa, setEtapa] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        numeroCartao: '',
        nomeCartao: '',
        validade: '',
        cvv: ''
    });

    // Planos disponíveis
    const planos = {
        pro: {
            id: 'pro',
            nome: 'Plano PRO',
            preco: 29,
            periodo: 'mês',
            descricao: 'Ideal para quem está começando'
        },
        premium: {
            id: 'premium',
            nome: 'Plano Premium',
            preco: 49,
            periodo: 'mês',
            descricao: 'Mais popular - Recursos completos'
        },
        anual: {
            id: 'anual',
            nome: 'Plano Anual',
            preco: 399,
            periodo: 'ano',
            descricao: 'Economize 32% - Melhor custo-benefício'
        }
    };

    useEffect(() => {
        // Buscar plano da URL ou state
        const searchParams = new URLSearchParams(location.search);
        const planoId = searchParams.get('plano') || location.state?.plano;

        if (planoId && planos[planoId as keyof typeof planos]) {
            setPlano(planos[planoId as keyof typeof planos]);
        } else {
            navigate('/planos');
        }
    }, [location, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Buscar CEP automaticamente
        if (name === 'cep' && value.length === 8) {
            buscarCEP(value);
        }
    };

    const buscarCEP = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simular processamento do pagamento
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        setEtapa(3); // Ir para etapa de confirmação
    };

    const formatarCartao = (numero: string) => {
        return numero.replace(/(\d{4})/g, '$1 ').trim();
    };

    if (!plano) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Finalizar Compra
                    </h1>
                    <p className="text-gray-600">Complete seu pedido em algumas etapas simples</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Resumo do Pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">{plano.nome}</span>
                                    <span className="font-semibold">R$ {plano.preco}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Período</span>
                                    <span className="text-gray-600">/{plano.periodo}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-orange-600">R$ {plano.preco}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progresso */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className={etapa >= 1 ? "text-orange-600 font-semibold" : "text-gray-400"}>
                                        1. Dados Pessoais
                                    </span>
                                    <span className={etapa >= 2 ? "text-orange-600 font-semibold" : "text-gray-400"}>
                                        2. Pagamento
                                    </span>
                                    <span className={etapa >= 3 ? "text-orange-600 font-semibold" : "text-gray-400"}>
                                        3. Confirmação
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(etapa / 3) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="lg:col-span-2">
                        {etapa === 1 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Dados Pessoais</h2>

                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nome Completo *
                                            </label>
                                            <input
                                                type="text"
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                E-mail *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Telefone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefone"
                                                value={formData.telefone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CPF *
                                            </label>
                                            <input
                                                type="text"
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setEtapa(2)}
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                                            disabled={!formData.nome || !formData.email || !formData.telefone || !formData.cpf}
                                        >
                                            Continuar para Pagamento
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {etapa === 2 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Pagamento</h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Número do Cartão *
                                        </label>
                                        <input
                                            type="text"
                                            name="numeroCartao"
                                            value={formData.numeroCartao}
                                            onChange={handleInputChange}
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome no Cartão *
                                        </label>
                                        <input
                                            type="text"
                                            name="nomeCartao"
                                            value={formData.nomeCartao}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Validade *
                                            </label>
                                            <input
                                                type="text"
                                                name="validade"
                                                value={formData.validade}
                                                onChange={handleInputChange}
                                                placeholder="MM/AA"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV *
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEtapa(1)}
                                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition hover:bg-gray-50"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                                            disabled={loading || !formData.numeroCartao || !formData.nomeCartao || !formData.validade || !formData.cvv}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Processando...
                                                </div>
                                            ) : (
                                                `Pagar R$ ${plano.preco}`
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {etapa === 3 && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Parabéns! Compra Realizada</h2>
                                <p className="text-gray-600 mb-2">
                                    Seu <strong>{plano.nome}</strong> foi ativado com sucesso!
                                </p>
                                <p className="text-gray-600 mb-6">
                                    Valor: <strong>R$ {plano.preco}</strong>
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => navigate('/lancamentos')}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                                    >
                                        Acessar Minha Conta
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition hover:bg-gray-50"
                                    >
                                        Voltar para Home
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}