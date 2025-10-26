import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    
    // Verifica se a rota está ativa
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="flex justify-between items-center px-6 lg:px-12 py-4 shadow-lg bg-gradient-to-r from-[#6e9987] to-[#5a8a77] sticky top-0 z-50">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                    <img
                        src="/financeLogo.png"
                        alt="Logo MyFinance"
                        className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300"></div>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">MyFinance</h1>
            </Link>

            {/* Navegação */}
            <nav className="flex gap-6 lg:gap-10 text-stone-800 font-semibold">
                <Link 
                    to="/lancamentos" 
                    className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isActive('/lancamentos') 
                            ? 'text-orange-600 bg-white/20 shadow-md' 
                            : 'hover:text-orange-700 hover:bg-white/10'
                    }`}
                >
                    Teste Grátis
                    {isActive('/lancamentos') && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                    )}
                </Link>
                
                <Link 
                    to="/planos" 
                    className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isActive('/planos') 
                            ? 'text-orange-600 bg-white/20 shadow-md' 
                            : 'hover:text-orange-700 hover:bg-white/10'
                    }`}
                >
                    Planos
                    {isActive('/planos') && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                    )}
                </Link>
                
                <Link 
                    to="/" 
                    className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isActive('/') 
                            ? 'text-orange-600 bg-white/20 shadow-md' 
                            : 'hover:text-orange-700 hover:bg-white/10'
                    }`}
                >
                    Início
                    {isActive('/') && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                    )}
                </Link>
            </nav>

            {/* Botões de Ação */}
            <div className="flex gap-3">
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-slate-900 hover:border-slate-700">
                   Entrar
                </button>
                <button className="bg-white hover:bg-gray-100 text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-white">
                    Cadastrar
                </button>
            </div>

        </header>
    );
}