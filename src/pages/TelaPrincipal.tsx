import { useState, useEffect } from 'react';

interface Lancamento {
    id: number;
    data: string;
    descricao: string;
    categoria: string;
    valor: number;
    tipo: 'entrada' | 'saida';
}

interface FormData {
    data: string;
    descricao: string;
    categoria: string;
    valor: string;
    tipo: 'entrada' | 'saida';
}

// Componente do Formulário
function FormularioLancamento({ onAdicionarLancamento }: { onAdicionarLancamento: (lancamento: Lancamento) => void }) {
    const [formData, setFormData] = useState<FormData>({
        data: new Date().toISOString().split('T')[0],
        descricao: '',
        categoria: '',
        valor: '',
        tipo: 'saida'
    });

    const categorias = [
        'Alimentação', 'Transporte', 'Moradia', 'Saúde', 
        'Educação', 'Lazer', 'Salário', 'Investimentos', 'Outros'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validação dos campos obrigatórios
        if (!formData.data || !formData.descricao.trim() || !formData.categoria || !formData.valor) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        if (parseFloat(formData.valor) <= 0) {
            alert('O valor deve ser maior que zero!');
            return;
        }

        const lancamento: Lancamento = {
            id: Date.now(),
            data: formData.data,
            descricao: formData.descricao.trim(),
            categoria: formData.categoria,
            valor: parseFloat(formData.valor),
            tipo: formData.tipo
        };

        onAdicionarLancamento(lancamento);
        
        // Reset do formulário (mantém a data atual)
        setFormData({
            data: new Date().toISOString().split('T')[0],
            descricao: '',
            categoria: '',
            valor: '',
            tipo: 'saida'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Novo Lançamento</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Data */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data *
                    </label>
                    <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Descrição */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição *
                    </label>
                    <input
                        type="text"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Ex: Supermercado, Salário, Aluguel..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria *
                    </label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Valor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor (R$) *
                    </label>
                    <input
                        type="number"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        step="0.01"
                        min="0.01"
                        placeholder="0,00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Tipo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo *
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tipo"
                                value="entrada"
                                checked={formData.tipo === 'entrada'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-green-600 font-medium">Entrada</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="tipo"
                                value="saida"
                                checked={formData.tipo === 'saida'}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-red-600 font-medium">Saída</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Adicionar Lançamento
                </button>
            </form>
        </div>
    );
}

// Componente do Totalizador
function Totalizador({ lancamentos }: { lancamentos: Lancamento[] }) {
    const totais = lancamentos.reduce(
        (acc, lancamento) => {
            if (lancamento.tipo === 'entrada') {
                acc.entradas += lancamento.valor;
            } else {
                acc.saidas += lancamento.valor;
            }
            return acc;
        },
        { entradas: 0, saidas: 0 }
    );

    const saldo = totais.entradas - totais.saidas;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h3 className="text-green-800 font-semibold text-sm uppercase tracking-wide">
                    Total Entradas
                </h3>
                <p className="text-2xl font-bold text-green-600 mt-1">
                    R$ {totais.entradas.toFixed(2)}
                </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <h3 className="text-red-800 font-semibold text-sm uppercase tracking-wide">
                    Total Saídas
                </h3>
                <p className="text-2xl font-bold text-red-600 mt-1">
                    R$ {totais.saidas.toFixed(2)}
                </p>
            </div>
            
            <div className={`border rounded-lg p-4 text-center ${
                saldo >= 0 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-orange-50 border-orange-200'
            }`}>
                <h3 className={`font-semibold text-sm uppercase tracking-wide ${
                    saldo >= 0 ? 'text-blue-800' : 'text-orange-800'
                }`}>
                    Saldo Atual
                </h3>
                <p className={`text-2xl font-bold mt-1 ${
                    saldo >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`}>
                    R$ {saldo.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

// Componente da Lista de Lançamentos
function ListaLancamentos({ lancamentos }: { lancamentos: Lancamento[] }) {
    const formatarData = (dataString: string) => {
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    if (lancamentos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">Nenhum lançamento cadastrado</p>
                <p className="text-gray-400 text-sm mt-1">
                    Adicione seu primeiro lançamento usando o formulário ao lado
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Lançamentos</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {lancamentos.map(lancamento => (
                    <div 
                        key={lancamento.id}
                        className={`border-l-4 p-4 rounded-r-lg ${
                            lancamento.tipo === 'entrada' 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-red-500 bg-red-50'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        {lancamento.descricao}
                                    </h3>
                                    <span className={`font-bold text-lg ${
                                        lancamento.tipo === 'entrada' 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                    }`}>
                                        {lancamento.tipo === 'entrada' ? '+' : '-'} R$ {lancamento.valor.toFixed(2)}
                                    </span>
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600 space-x-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatarData(lancamento.data)}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        {lancamento.categoria}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Componente Principal
export default function TelaPrincipal() {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    // useEffect para carregar dados do localStorage (opcional)
    useEffect(() => {
        const dadosSalvos = localStorage.getItem('lancamentos-financeiros');
        if (dadosSalvos) {
            setLancamentos(JSON.parse(dadosSalvos));
        }
    }, []);

    // useEffect para salvar dados no localStorage
    useEffect(() => {
        localStorage.setItem('lancamentos-financeiros', JSON.stringify(lancamentos));
    }, [lancamentos]);

    const handleAdicionarLancamento = (novoLancamento: Lancamento) => {
        setLancamentos(prev => [novoLancamento, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Controle Financeiro Pessoal
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Gerencie suas entradas e saídas de forma simples
                    </p>
                </div>

                {/* Totalizador */}
                <Totalizador lancamentos={lancamentos} />

                {/* Conteúdo Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Formulário */}
                    <FormularioLancamento onAdicionarLancamento={handleAdicionarLancamento} />
                    
                    {/* Lista de Lançamentos */}
                    <ListaLancamentos lancamentos={lancamentos} />
                </div>
            </div>
        </div>
    );
}