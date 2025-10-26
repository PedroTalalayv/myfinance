import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const location = useLocation();
    const [menuAberto, setMenuAberto] = useState(false);
    
    // Verifica se a rota está ativa
    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <header className="flex justify-between items-center px-4 lg:px-12 py-3 shadow-lg bg-gradient-to-r from-[#6e9987] to-[#5a8a77] sticky top-0 z-50">
                
                
                <Link to="/" className="flex items-center gap-2 group z-50">
                    <div className="relative">
                        <img
                            src="/financeLogo.png"
                            alt="Logo MyFinance"
                            className="h-10 w-10 lg:h-12 lg:w-12 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300"></div>
                    </div>
                    <h1 className="text-lg lg:text-2xl font-bold text-gray-800 hidden sm:block">MyFinance</h1>
                </Link>

                {/* Navegação Desktop */}
                <nav className="hidden md:flex gap-4 lg:gap-8 text-stone-800 font-semibold">
                    <Link 
                        to="/lancamentos" 
                        className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm lg:text-base ${
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
                        className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm lg:text-base ${
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
                        className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm lg:text-base ${
                            isActive('/') 
                                ? 'text-orange-600 bg-white/20 shadow-md' 
                                : 'hover:text-orange-700 hover:bg-white/10'
                        }`}
                    >
                        🏠 Início
                        {isActive('/') && (
                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                        )}
                    </Link>
                </nav>

                
                <div className="hidden md:flex gap-3">
                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-slate-900 hover:border-slate-700 text-sm lg:text-base">
                        Entrar
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-slate-900 px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 border-white text-sm lg:text-base">
                        Cadastrar
                    </button>
                </div>

                {/* Menu Hamburger Mobile */}
                <button 
                    className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors z-50"
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuAberto ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuAberto ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuAberto ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </header>

            {/* Menu Mobile */}
            <div className={`fixed inset-0 bg-gradient-to-br from-[#6e9987] to-[#5a8a77] z-40 transition-all duration-300 md:hidden ${
                menuAberto ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
                    {/* Logo Mobile */}
                    <div className="flex items-center gap-3 mb-8">
                        <img
                            src="/financeLogo.png"
                            alt="Logo MyFinance"
                            className="h-16 w-16 object-contain"
                        />
                        <h1 className="text-2xl font-bold text-gray-800">MyFinance</h1>
                    </div>

                    {/* Links Mobile */}
                    <nav className="flex flex-col gap-6 text-center w-full px-8">
                        <Link 
                            to="/lancamentos" 
                            className={`text-xl font-semibold py-4 rounded-2xl transition-all duration-300 ${
                                isActive('/lancamentos') 
                                    ? 'text-orange-600 bg-white/30 shadow-lg' 
                                    : 'text-gray-800 hover:text-orange-700 hover:bg-white/20'
                            }`}
                            onClick={() => setMenuAberto(false)}
                        >
                            Teste Grátis
                        </Link>
                        
                        <Link 
                            to="/planos" 
                            className={`text-xl font-semibold py-4 rounded-2xl transition-all duration-300 ${
                                isActive('/planos') 
                                    ? 'text-orange-600 bg-white/30 shadow-lg' 
                                    : 'text-gray-800 hover:text-orange-700 hover:bg-white/20'
                            }`}
                            onClick={() => setMenuAberto(false)}
                        >
                            Planos
                        </Link>
                        
                        <Link 
                            to="/" 
                            className={`text-xl font-semibold py-4 rounded-2xl transition-all duration-300 ${
                                isActive('/') 
                                    ? 'text-orange-600 bg-white/30 shadow-lg' 
                                    : 'text-gray-800 hover:text-orange-700 hover:bg-white/20'
                            }`}
                            onClick={() => setMenuAberto(false)}
                        >
                            Início
                        </Link>
                    </nav>

                    {/* Botões Mobile */}
                    <div className="flex flex-col gap-4 w-full px-8 mt-8">
                        <button className="bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 text-lg">
                            Entrar
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-slate-900 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 text-lg">
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}