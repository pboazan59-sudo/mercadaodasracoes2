import { useState, useEffect, ComponentType, FormEvent } from "react";
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Check, 
  Star, 
  Scissors, 
  ShieldCheck, 
  Stethoscope, 
  Syringe, 
  HeartPulse, 
  Sparkles, 
  Droplets, 
  Instagram, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Heart, 
  Smile, 
  Award,
  ThumbsUp,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ProductCatalog from "./components/ProductCatalog";

// Interfaces para os tipos de dados
interface Service {
  id: string;
  title: string;
  category: "grooming" | "health";
  description: string;
  icon: ComponentType<any>;
  badge?: string;
}

interface Testimonial {
  id: string;
  name: string;
  petName: string;
  petType: "Cachorro" | "Gato";
  rating: number;
  text: string;
  avatar: string;
}

export default function App() {
  // Estados para navegação, filtros e agendamento
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito para adicionar sombra no menu ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dados dos Serviços
  const services: Service[] = [
    {
      id: "s1",
      title: "Consulta Veterinária de Rotina",
      category: "health",
      description: "Avaliação detalhada da saúde geral do seu pet, ideal para acompanhar o desenvolvimento e bem-estar em todas as fases da vida.",
      icon: Stethoscope,
      badge: "Essencial"
    },
    {
      id: "s2",
      title: "Aplicação de Vacinas Importadas e Nacionais",
      category: "health",
      description: "Imunização completa com vacinas de alta qualidade (V10, Antirrábica, Gripe, etc) para manter seu pet seguro e protegido contra doenças.",
      icon: Syringe,
      badge: "Prevenção"
    },
    {
      id: "s3",
      title: "Atendimento Clínico Geral",
      category: "health",
      description: "Consultas, diagnósticos e tratamentos especializados para restabelecer a saúde e alegria de cães e gatos com cuidado e dedicação.",
      icon: HeartPulse
    },
    {
      id: "s4",
      title: "Banho e Tosa Completo",
      category: "grooming",
      description: "Higienização profunda, secagem técnica, corte de pelos personalizado de acordo com a raça e acabamento impecável.",
      icon: Sparkles,
      badge: "Mais Vendido"
    },
    {
      id: "s5",
      title: "Tosa Higiênica",
      category: "grooming",
      description: "Corte funcional focado na limpeza das patinhas, barriga e região íntima, garantindo bem-estar e asseio contínuo.",
      icon: Scissors
    },
    {
      id: "s6",
      title: "Corte de Unhas e Limpeza de Ouvidos",
      category: "grooming",
      description: "Aparação segura das garras e higienização cuidadosa do canal auditivo, prevenindo dores e infecções de ouvido.",
      icon: ShieldCheck
    },
    {
      id: "s7",
      title: "Hidratação de Pelagem e Produtos para Beleza Pet",
      category: "grooming",
      description: "Tratamentos especiais de reconstrução capilar e banhos hidratantes utilizando produtos profissionais renomados.",
      icon: Droplets
    },
    {
      id: "s8",
      title: "Serviço de Táxi Dog / Busca e Leva",
      category: "grooming",
      description: "Transporte seguro, confortável e climatizado para buscar e levar seu amiguinho com todo o conforto e praticidade.",
      icon: Sparkles
    },
    {
      id: "s9",
      title: "Venda de Rações a Granel e Sacaria Comercial",
      category: "grooming",
      description: "Rações premium, super premium e de manutenção pesadas na hora ou sacos lacrados das melhores marcas do mercado.",
      icon: Sparkles,
      badge: "Novidade"
    },
    {
      id: "s10",
      title: "Rações Especiais para Peixes e Pássaros",
      category: "grooming",
      description: "Alimentos balanceados de alta digestibilidade e nutrientes específicos para peixes de aquário e pássaros domésticos.",
      icon: Sparkles
    },
    {
      id: "s11",
      title: "Areia Sanitária e Granulados para Gatos",
      category: "grooming",
      description: "Diversas opções de granulados sanitários, areias biodegradáveis e sílicas de alto rendimento para a higiene dos felinos.",
      icon: Sparkles
    },
    {
      id: "s12",
      title: "Brinquedos e Acessórios Interativos",
      category: "grooming",
      description: "Mordedores resistentes, arranhadores, comedouros lentos, petiscos e jogos mentais para enriquecimento ambiental.",
      icon: Sparkles
    },
    {
      id: "s13",
      title: "Camas Confortáveis e Roupinhas Pet",
      category: "grooming",
      description: "Cochonetes, caminhas laváveis de vários tamanhos e roupas estilosas para proteger seu amigo no frio com conforto.",
      icon: Sparkles
    },
    {
      id: "s14",
      title: "Orientação em Medicamentos (Farmácia Veterinária)",
      category: "health",
      description: "Suporte completo na escolha e dosagem de vermífugos, antipulgas, colírios e tratamentos indicados pelo veterinário.",
      icon: ShieldCheck,
      badge: "Farmácia"
    }
  ];

  // Dados dos Depoimentos
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Mariana Silva",
      petName: "Pipoca",
      petType: "Cachorro",
      rating: 5,
      text: "Meu cachorro voltou cheiroso, calmo e muito bem cuidado. Geralmente ele morre de medo de banho, mas aqui ele se sente em casa! Atendimento excelente!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "t2",
      name: "Rodrigo Costa",
      petName: "Mingau",
      petType: "Gato",
      rating: 5,
      text: "Gostei muito da veterinária, explicou tudo com paciência, calma e muito carinho. O Mingau costuma ficar estressado, mas ela tem um jeito maravilhoso com gatos.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "t3",
      name: "Ana Julia Ferreira",
      petName: "Luna",
      petType: "Cachorro",
      rating: 5,
      text: "O melhor banho e tosa da região! A tosa na tesoura que fazem na Luna fica impecável, super simétrica e ela cheira maravilhosamente por dias. Recomendo demais!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg font-sans antialiased text-brand-text selection:bg-brand-primary-light selection:text-brand-primary-dark">
      
      {/* 1. TOPO / MENU */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-brand-primary-light" 
            : "bg-transparent py-5"
        }`}
        id="header-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#inicio" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-110">
                <span className="text-xl">🐾</span>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-brand-primary-dark">
                  Mercadão <span className="text-brand-accent">das Rações</span>
                </span>
                <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest -mt-1">
                  Rações & Pet Shop
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <a href="#inicio" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Início</a>
              <a href="#servicos" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Serviços</a>
              <a href="#veterinaria" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Veterinária</a>
              <a href="#loja" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Nossa Loja</a>
              <a href="#avaliacoes" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Avaliações</a>
              <a href="#localizacao" className="px-3 py-2 text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors">Localização</a>
            </nav>

            {/* CTA Header Button */}
            <div className="hidden lg:block">
              <a 
                href="https://wa.me/5511999999999?text=Olá! Gostaria de falar com o Mercadão das Rações." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                id="cta-whatsapp-header"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-brand-text hover:text-brand-primary hover:bg-brand-primary-light transition-all focus:outline-none"
                aria-label="Abrir Menu"
                id="btn-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-brand-primary-light shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <a 
                  href="#inicio" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Início
                </a>
                <a 
                  href="#servicos" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Serviços
                </a>
                <a 
                  href="#veterinaria" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Veterinária
                </a>
                <a 
                  href="#loja" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Nossa Loja
                </a>
                <a 
                  href="#avaliacoes" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Avaliações
                </a>
                <a 
                  href="#localizacao" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-brand-text hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
                >
                  Localização
                </a>
                
                <div className="pt-4 px-3">
                  <a 
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de falar com o Mercadão das Rações."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-full font-bold shadow-md transition-colors text-center"
                  >
                    <Phone className="w-5 h-5 fill-white" />
                    <span>Agendar pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. SEÇÃO PRINCIPAL / HERO */}
      <section 
        id="inicio" 
        className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36 bg-gradient-to-b from-brand-primary-light/55 via-brand-bg to-brand-bg overflow-hidden rounded-b-[40px] md:rounded-b-[60px]"
      >
        {/* Background elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-brand-primary-light/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-brand-primary-light border border-brand-primary-light/80 rounded-full py-1.5 px-4 text-xs font-bold text-brand-primary-dark uppercase tracking-wider mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span>Seu pet em excelentes mãos</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-primary-dark leading-[1.1]">
                Cuidado, carinho e saúde para o seu pet <span className="text-brand-accent">em um só lugar</span>
              </h1>

              <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                Rações premium, acessórios interativos, banho e tosa, atendimento veterinário e tudo o que seu melhor amigo precisa em um só lugar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de falar com o Mercadão das Rações." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-accent-dark text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-brand-accent/20"
                  id="hero-btn-primary"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Falar no WhatsApp</span>
                </a>
                
                <a 
                  href="#servicos" 
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white border border-brand-primary/30 hover:bg-brand-primary-light/40 text-brand-primary-dark px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1"
                  id="hero-btn-secondary"
                >
                  <span>Conheça nossos serviços</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Mini visual elements */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-primary-light max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-brand-primary">100%</span>
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Seguro & Confiável</span>
                </div>
                <div className="text-center lg:text-left border-l border-r border-brand-primary-light px-4">
                  <span className="block text-2xl font-black text-brand-accent">+5 mil</span>
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Pets Felizes</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-brand-primary">Nota 5.0</span>
                  <span className="text-[10px] font-bold text-stone-500 uppercase">Avaliação Google</span>
                </div>
              </div>

              {/* Promotional Veterinarian Banner */}
              <div className="mt-8 max-w-md mx-auto lg:mx-0 rounded-[24px] overflow-hidden shadow-md border border-brand-primary-light transform transition-transform hover:scale-[1.02] duration-300">
                <img 
                  src="/src/assets/images/vet_promo_banner_1782683425417.jpg"
                  alt="Veterinária Mercadão das Rações"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none flex justify-center">
                
                {/* Main Image Frame with cute border */}
                <div className="relative w-full max-w-[420px] aspect-square rounded-[36px] overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
                    alt="Cachorrinhos felizes se divertindo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
                </div>

                {/* Overlapping Absolute Bubbles */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-lg border border-brand-primary-light flex items-center space-x-3 max-w-[200px]">
                  <div className="w-9 h-9 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-primary-dark">Banho e Tosa</span>
                    <span className="text-[10px] text-stone-500">Pelagem limpa e brilhosa</span>
                  </div>
                </div>

                <div className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-brand-primary-light flex items-center space-x-3 max-w-[210px]">
                  <div className="w-9 h-9 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-primary-dark">Clínica Veterinária</span>
                    <span className="text-[10px] text-stone-500">Cuidado médico de ponta</span>
                  </div>
                </div>

                <div className="absolute -right-6 top-1/3 bg-brand-accent text-white rounded-full p-3 shadow-md transform rotate-12 hidden sm:block">
                  <Smile className="w-6 h-6" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVIÇOS */}
      <section id="servicos" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header de Seção */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-brand-accent uppercase tracking-widest block">O Que Fazemos de Melhor</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-dark tracking-tight">
              Nossos Serviços Especializados
            </h2>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            <p className="text-base text-brand-text font-semibold leading-relaxed">
              Equipamentos de última geração, profissionais qualificados e muito amor envolvido em cada cuidado. Conheça nossa gama completa de soluções estéticas e médicas.
            </p>
          </div>

          {/* Categoria Estética & Banho/Tosa */}
          <div className="mb-14">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 bg-brand-primary-light text-brand-primary rounded-xl">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary-dark">Higiene, Estética e Bem-Estar</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(s => s.category === "grooming").map((service) => {
                const IconComp = service.icon;
                return (
                  <a 
                    key={service.id}
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto/serviço: *${service.title}*`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-[32px] p-6 shadow-sm border border-brand-primary-light hover:border-brand-primary hover:bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-left"
                  >
                    {service.badge && (
                      <span className="absolute top-4 right-4 bg-brand-accent/20 text-brand-accent-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-brand-primary-light text-brand-primary rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-brand-primary-dark group-hover:text-brand-primary transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-brand-text leading-relaxed font-semibold">
                        {service.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-brand-primary-light flex items-center justify-between text-xs text-brand-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Pedir no WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Categoria Saúde & Veterinária */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 bg-[#E8F5E9] text-[#388E3C] rounded-xl">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary-dark">Saúde e Medicina Preventiva</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(s => s.category === "health").map((service) => {
                const IconComp = service.icon;
                return (
                  <a 
                    key={service.id}
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o atendimento de saúde: *${service.title}*`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-[32px] p-6 shadow-sm border border-[#E8F5E9] hover:border-[#388E3C] hover:bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between text-left"
                  >
                    {service.badge && (
                      <span className="absolute top-4 right-4 bg-[#E8F5E9] text-[#388E3C] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#E8F5E9] text-[#388E3C] rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-brand-primary-dark group-hover:text-[#388E3C] transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-sm text-brand-text leading-relaxed font-semibold">
                        {service.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-brand-primary-light flex items-center justify-between text-xs text-[#388E3C] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Saber mais no WhatsApp</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 5. SEÇÃO VETERINÁRIA */}
      <section id="veterinaria" className="py-20 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="bg-[#F1F8E9] rounded-[40px] p-8 sm:p-12 lg:p-16 shadow-sm border border-[#DCEDC8] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-12 right-12 w-64 h-64 bg-[#DCEDC8]/40 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Image Column */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative">
                  {/* Decorative background shape */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8BC34A] to-[#4CAF50] rounded-[36px] transform -rotate-3 scale-102 opacity-15"></div>
                  
                  <div className="relative rounded-[32px] overflow-hidden shadow-md border-4 border-white bg-white aspect-square max-w-md mx-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"
                      alt="Veterinária carinhosa atendendo cachorro"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating tag inside photo */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-md border border-[#DCEDC8] flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold text-xs">
                        CRV
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-brand-primary-dark">Dra. Camila de Souza</span>
                        <span className="text-[10px] text-stone-500">Clínica Geral e Preventiva (CRMV 12345)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-7 space-y-6 lg:order-2">
                <span className="text-sm font-bold text-[#388E3C] uppercase tracking-widest block">Atendimento Humanizado</span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-dark leading-tight">
                  Atendimento veterinário com cuidado, atenção e responsabilidade
                </h2>
                
                <p className="text-base sm:text-lg text-brand-text leading-relaxed font-semibold">
                  Sabemos que seu pet é parte preciosa da família. Por isso, oferecemos uma estrutura dedicada ao bem-estar e à saúde animal, com foco em medicina preventiva e diagnósticos precisos.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#388E3C] shrink-0 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary-dark">Consultas Personalizadas</h4>
                      <p className="text-xs text-stone-600">Tempo de qualidade para examinar, conversar e entender todo o histórico do seu animalzinho.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#388E3C] shrink-0 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary-dark">Orientação Nutricional e Geriátrica</h4>
                      <p className="text-xs text-stone-600">Cuidado especializado para filhotes em crescimento e melhor idade para pets seniores.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#388E3C] shrink-0 mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-primary-dark">Imunização Importada de Alta Eficácia</h4>
                      <p className="text-xs text-stone-600">Protocolos vacinais personalizados para proteger contra as doenças mais perigosas.</p>
                    </div>
                  </div>
                </div>

                 <div className="pt-4 flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta veterinária no Mercadão das Rações." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-full font-bold shadow-md transition-colors"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Marcar Consulta Vet</span>
                  </a>
                  <a 
                    href="#localizacao" 
                    className="inline-flex items-center space-x-2 bg-white border border-[#DCEDC8] text-[#33691E] hover:bg-[#F1F8E9] px-6 py-3 rounded-full font-bold transition-colors"
                  >
                    <span>Ver Endereço</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3.5. NOSSA LOJA DE PRODUTOS */}
      <section id="loja" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header de Seção */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-sm font-bold text-brand-accent uppercase tracking-widest block">Sua Conveniência</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-dark tracking-tight">
              Vitrine de Produtos & Acessórios
            </h2>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            <p className="text-base text-brand-text font-semibold leading-relaxed">
              Encontre o melhor para a alimentação, diversão, higiene e estilo do seu pet. Adicione novos produtos para a venda e facilite o agendamento de pedidos via WhatsApp!
            </p>
          </div>

          <ProductCatalog />

        </div>
      </section>

      {/* 7. AVALIAÇÕES DE CLIENTES */}
      <section id="avaliacoes" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header de Seção */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-sm font-bold text-brand-accent uppercase tracking-widest block">Quem Ama Aprova</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-dark tracking-tight">
              O Que Dizem os Nossos Tutores
            </h2>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            <p className="text-sm text-brand-text font-semibold">
              Amor de tutor não se mede, mas nós medimos nossa dedicação no sorriso e bem-estar de cada peludinho. Veja depoimentos reais:
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div 
                key={test.id}
                className="bg-white rounded-[32px] p-6 shadow-sm border border-brand-primary-light relative flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                {/* Top Quotes visual indicator */}
                <div className="absolute top-6 right-6 text-brand-primary-light text-4xl font-serif pointer-events-none select-none">
                  “
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 text-brand-accent fill-brand-accent" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-sm text-brand-text italic leading-relaxed font-semibold">
                    "{test.text}"
                  </p>
                </div>

                {/* Tutor Info Footer */}
                <div className="flex items-center space-x-3.5 pt-5 mt-6 border-t border-brand-primary-light">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary-light shadow-sm shrink-0">
                    <img 
                      src={test.avatar} 
                      alt={test.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary-dark">{test.name}</h4>
                    <span className="text-[10px] font-bold text-brand-text uppercase tracking-wide">
                      Tutor(a) do {test.petName} ({test.petType})
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Additional visual stats bar */}
          <div className="mt-14 p-6 bg-white rounded-3xl border border-brand-primary-light flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ★
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-primary-dark">Classificação de excelência</h4>
                <p className="text-xs text-brand-text font-semibold">Média de 4.9/5 estrelas baseada em centenas de feedbacks no Google Maps e redes.</p>
              </div>
            </div>
            <a 
              href="https://wa.me/5522999999999?text=Olá! Gostaria de tirar uma dúvida e agendar atendimento."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl text-xs font-bold shadow-sm transition-colors shrink-0"
            >
              Envie Seu Depoimento
            </a>
          </div>

        </div>
      </section>

      {/* 8. LOCALIZAÇÃO */}
      <section id="localizacao" className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Address Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-sm font-bold text-brand-accent uppercase tracking-widest block">Venha nos Visitar</span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary-dark tracking-tight">
                Onde Fica Nosso Cantinho
              </h2>
              
              <p className="text-base text-brand-text leading-relaxed font-semibold">
                Estamos localizados em uma área central de fácil acesso, com estacionamento exclusivo para que você possa trazer e buscar seu pet com total tranquilidade e segurança.
              </p>

              <div className="space-y-4">
                
                {/* Endereço */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-brand-primary flex items-center justify-center shadow-sm shrink-0 mt-1 border border-brand-primary-light">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary-dark">Endereço Oficial</h4>
                    <p className="text-sm text-brand-text font-semibold">Av. Guapira, 530 - Tucuruvi, São Paulo - SP, 02265-001</p>
                    <span className="text-xs text-stone-500 block mt-0.5 font-semibold">Ponto de referência: Próximo ao Metrô Tucuruvi.</span>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-brand-accent flex items-center justify-center shadow-sm shrink-0 mt-1 border border-brand-primary-light">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary-dark">Horário de Atendimento</h4>
                    <p className="text-sm text-brand-text font-semibold">Segunda a Sábado, das 8h às 18h</p>
                    <span className="text-xs text-stone-500 block mt-0.5 font-semibold">Finais de semana recomendável agendamento prévio.</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://maps.google.com/?q=Av.+Guapira,+530+-+Tucuruvi,+São+Paulo+-+SP,+02265-001" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3.5 rounded-full text-xs font-bold shadow-md transition-colors"
                  id="btn-google-maps"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver no Google Maps</span>
                </a>

                <a 
                  href="https://wa.me/5511999999999?text=Olá, gostaria de tirar uma dúvida sobre a localização do Mercadão das Rações." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-full text-xs font-bold shadow-md transition-colors"
                  id="btn-whatsapp-localizacao"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Simulated Interactive Map */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border-4 border-white bg-brand-primary-light aspect-video w-full flex items-center justify-center">
                
                {/* Background Map Graphic Placeholder (visually styled map look with SVG pathing and dots) */}
                <div className="absolute inset-0 bg-brand-bg opacity-95 overflow-hidden select-none">
                  <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="50" x2="1000" y2="50" stroke="var(--color-brand-primary)" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="0" y1="180" x2="1000" y2="180" stroke="var(--color-brand-primary)" strokeWidth="1" />
                    <line x1="120" y1="0" x2="120" y2="500" stroke="var(--color-brand-primary)" strokeWidth="3" />
                    <line x1="300" y1="0" x2="300" y2="500" stroke="var(--color-brand-primary)" strokeWidth="2" strokeDasharray="2,8" />
                    <circle cx="450" cy="180" r="140" fill="var(--color-brand-primary)" fillOpacity="0.08" />
                    <circle cx="450" cy="180" r="280" fill="var(--color-brand-accent)" fillOpacity="0.05" />
                  </svg>

                  {/* Simulated streets / green blocks */}
                  <div className="absolute top-10 left-10 w-24 h-16 bg-brand-primary-light border border-brand-primary/20 rounded-lg flex items-center justify-center text-[10px] text-brand-primary-dark font-bold">Praça Central</div>
                  <div className="absolute top-40 left-48 w-44 h-24 bg-white rounded-xl border border-brand-primary-light flex items-center justify-center text-[11px] text-brand-text font-bold">Parque dos Cães</div>
                  <div className="absolute bottom-6 right-20 w-36 h-20 bg-white rounded-xl border border-brand-primary-light flex items-center justify-center text-[11px] text-brand-text font-bold">Av. Principal</div>
                  
                  {/* Street Labels */}
                  <span className="absolute top-[154px] left-[320px] text-[10px] font-bold text-brand-primary rotate-1 transform tracking-wider">AV. GUAPIRA (Nº 530)</span>
                </div>

                {/* Animated Destination Marker pin */}
                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Radar pulse effect */}
                  <div className="absolute w-12 h-12 bg-brand-accent rounded-full animate-ping opacity-35"></div>
                  
                  {/* Pin wrapper */}
                  <div className="w-12 h-12 bg-brand-accent rounded-full border-2 border-white flex items-center justify-center shadow-lg text-white relative z-10 transition-transform hover:scale-110">
                    <Scissors className="w-6 h-6 rotate-45" />
                  </div>
                  
                  {/* Floating tooltip above marker */}
                  <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-brand-accent mt-2 flex items-center space-x-2">
                    <span className="text-[11px] font-extrabold text-brand-primary-dark">Mercadão das Rações</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. RODAPÉ */}
      <footer className="bg-[#132314] text-stone-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-sm">
                  <span className="text-xs">🐾</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-white font-display">
                  Mercadão das Rações
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
                Oferecendo a melhor experiência em rações, acessórios, banho, tosa, saúde estética e medicina veterinária. Tudo o que seu pet precisa com o carinho que ele merece.
              </p>
              
              {/* Social icons */}
              <div className="flex items-center space-x-3 pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 text-stone-300 hover:text-brand-accent hover:bg-white/10 transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 text-stone-300 hover:text-brand-accent hover:bg-white/10 transition-colors flex items-center justify-center"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Acesso Rápido</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#inicio" className="hover:text-brand-accent transition-colors">Início</a></li>
                <li><a href="#servicos" className="hover:text-brand-accent transition-colors">Nossos Serviços</a></li>
                <li><a href="#veterinaria" className="hover:text-brand-accent transition-colors">Clínica Veterinária</a></li>
                <li><a href="#loja" className="hover:text-brand-accent transition-colors">Nossa Loja</a></li>
                <li><a href="#avaliacoes" className="hover:text-brand-accent transition-colors">Avaliações reais</a></li>
              </ul>
            </div>

            {/* Col 3: Contacts / Hours */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">Contatos</h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                  <span>Av. Guapira, 530 - Tucuruvi, São Paulo - SP, 02265-001</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Clock className="w-4.5 h-4.5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold">Segunda a Sábado</p>
                    <p className="text-stone-300 font-semibold">Das 08:00h às 18:00h</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© 2026 Mercadão das Rações. Todos os direitos reservados.</p>
            <p className="flex items-center space-x-1">
              <span>Feito com amor para pets</span>
              <span className="text-brand-accent">♥</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
