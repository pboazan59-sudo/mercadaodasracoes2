import { useState, useEffect, FormEvent } from "react";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Trash2, 
  Tag, 
  X, 
  MessageSquare, 
  Check, 
  Sparkles, 
  Package 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface Product {
  id: string;
  name: string;
  category: "food" | "toy" | "pharmacy" | "accessory";
  price: number;
  imageUrl: string;
  description: string;
  isUserAdded?: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Ração Premium Golden Duo Cães Adultos 15kg",
    category: "food",
    price: 159.90,
    imageUrl: "https://images.unsplash.com/photo-1585499103188-5972f78d727f?auto=format&fit=crop&q=80&w=400",
    description: "Alimento completo de alta qualidade para cães adultos com dois sabores irresistíveis na mesma embalagem."
  },
  {
    id: "p2",
    name: "Brinquedo Mordedor Kong Classic",
    category: "toy",
    price: 89.90,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400",
    description: "Brinquedo de borracha ultra resistente, ideal para rechear com petiscos e manter seu cão ativo e entretido."
  },
  {
    id: "p3",
    name: "Coleira Peitoral Ergonômica Conforto",
    category: "accessory",
    price: 64.90,
    imageUrl: "https://images.unsplash.com/photo-1541599540903-216a46ca1bf0?auto=format&fit=crop&q=80&w=400",
    description: "Peitoral acolchoado ajustável com fitas reflexivas, proporcionando passeios seguros e confortáveis para cães de médio porte."
  },
  {
    id: "p4",
    name: "Antiparasitário NexGard Cães 10-25kg",
    category: "pharmacy",
    price: 145.00,
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400",
    description: "Tablete mastigável sabor carne altamente palatável para tratamento e prevenção de pulgas e carrapatos por 30 dias."
  },
  {
    id: "p5",
    name: "Shampoo Hidratante Camomila 500ml",
    category: "pharmacy",
    price: 34.90,
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400",
    description: "Shampoo neutro hipoalergênico com extrato natural de camomila para acalmar a pele e realçar o brilho dos pelos claros."
  }
];

const CATEGORY_MAP = {
  all: "Todos",
  food: "Ração / Alimentação",
  toy: "Brinquedos",
  pharmacy: "Farmácia / Higiene",
  accessory: "Acessórios"
};

const CATEGORY_COLORS = {
  food: "bg-[#FFF3E0] text-[#E65100]",
  toy: "bg-[#E1F5FE] text-[#01579B]",
  pharmacy: "bg-[#E8F5E9] text-[#2E7D32]",
  accessory: "bg-[#F3E5F5] text-[#4A148C]"
};

const DEFAULT_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400", // Cute dog playing
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=400", // Puppy with collar
  "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=400", // Dog with glasses
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400"  // Puppy nose
];

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<"all" | "food" | "toy" | "pharmacy" | "accessory">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"food" | "toy" | "pharmacy" | "accessory">("food");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load products from localStorage or use initial list
  useEffect(() => {
    const saved = localStorage.getItem("mercadao_racoes_products");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
    }
  }, []);

  const saveProducts = (updatedList: Product[]) => {
    setProducts(updatedList);
    localStorage.setItem("mercadao_racoes_products", JSON.stringify(updatedList));
  };

  // Add Product
  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return;
    }

    // Pick a random placeholder image if none is provided
    const finalImageUrl = imageUrl.trim() || DEFAULT_PLACEHOLDERS[Math.floor(Math.random() * DEFAULT_PLACEHOLDERS.length)];

    const newProduct: Product = {
      id: "p_user_" + Date.now(),
      name: name.trim(),
      category,
      price: priceNum,
      imageUrl: finalImageUrl,
      description: description.trim(),
      isUserAdded: true
    };

    const updatedList = [newProduct, ...products];
    saveProducts(updatedList);

    // Reset Form
    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setCategory("food");
    setIsFormOpen(false);

    // Show beautiful transient success message
    setSuccessMessage("Produto cadastrado com sucesso!");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // Delete product (only allowed for user added ones)
  const handleDeleteProduct = (id: string) => {
    const updatedList = products.filter(p => p.id !== id);
    saveProducts(updatedList);
  };

  // WhatsApp purchase message redirect
  const handleBuyWhatsapp = (product: Product) => {
    const phone = "5511999999999";
    const message = `Olá, tudo bem? Gostaria de saber sobre a disponibilidade do seguinte produto para venda no Mercadão das Rações:
🛍️ *${product.name}*
🏷️ Categoria: ${CATEGORY_MAP[product.category]}
💵 Valor: R$ ${product.price.toFixed(2).replace(".", ",")}
📦 ID do produto: ${product.id}

Está disponível para retirada ou entrega? Obrigado(a)!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === "all" || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      
      {/* Search, Filter & Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 order-2 md:order-1">
          {(Object.keys(CATEGORY_MAP) as Array<keyof typeof CATEGORY_MAP>).map((catKey) => (
            <button
              key={catKey}
              onClick={() => setFilter(catKey as any)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                filter === catKey
                  ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                  : "bg-white text-brand-text border-brand-primary-light hover:bg-brand-bg"
              }`}
            >
              {CATEGORY_MAP[catKey]}
            </button>
          ))}
        </div>

        {/* Search & Add button */}
        <div className="flex items-center gap-2 w-full md:w-auto order-1 md:order-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-primary-light rounded-2xl pl-9 pr-4 py-2.5 text-xs focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold text-brand-text"
            />
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center space-x-1 bg-brand-accent hover:bg-brand-accent-dark text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-sm transition-all shrink-0"
          >
            {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isFormOpen ? "Fechar" : "Novo Produto"}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Bubble */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-bold rounded-2xl flex items-center space-x-2 shadow-sm"
          >
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Product Collapsible Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form 
              onSubmit={handleAddProduct}
              className="bg-white rounded-[32px] p-6 sm:p-8 border border-brand-primary-light shadow-sm space-y-6"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-primary-dark">Cadastrar Produto para Venda</h4>
                  <p className="text-[10px] text-stone-500 font-semibold">Preencha os dados para listar o item na vitrine da loja física.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Nome do Produto */}
                <div className="md:col-span-6">
                  <label className="block text-xs font-bold text-brand-primary-dark mb-1.5">
                    Nome do Produto *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Brinquedo Mordedor Osso Flex"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-primary-light rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold"
                  />
                </div>

                {/* Preço */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-brand-primary-dark mb-1.5">
                    Preço (R$) *
                  </label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    min="0.01"
                    placeholder="Ex: 45.90"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-primary-light rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold"
                  />
                </div>

                {/* Categoria */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-brand-primary-dark mb-1.5">
                    Categoria *
                  </label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-brand-bg border border-brand-primary-light rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold"
                  >
                    <option value="food">Ração / Alimentação</option>
                    <option value="toy">Brinquedo</option>
                    <option value="pharmacy">Farmácia / Higiene</option>
                    <option value="accessory">Acessório</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Imagem URL */}
                <div className="md:col-span-12">
                  <label className="block text-xs font-bold text-brand-primary-dark mb-1.5 flex items-center justify-between">
                    <span>URL da Imagem (Opcional)</span>
                    <span className="text-[9px] text-stone-400">Deixe em branco para uma imagem pet aleatória</span>
                  </label>
                  <input 
                    type="url"
                    placeholder="Ex: https://exemplo.com/imagem.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-primary-light rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-xs font-bold text-brand-primary-dark mb-1.5">
                  Descrição detalhada *
                </label>
                <textarea 
                  required
                  rows={3}
                  maxLength={160}
                  placeholder="Escreva brevemente o que torna este produto excelente para os pets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-primary-light rounded-xl px-4 py-3 text-sm focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light focus:outline-none transition-all font-semibold resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-500 font-bold text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl font-bold text-xs shadow-md transition-colors"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[32px] p-4 shadow-sm border border-brand-primary-light hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Product Badge / Category label */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5">
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${CATEGORY_COLORS[product.category]}`}>
                  {CATEGORY_MAP[product.category]}
                </span>
                {product.isUserAdded && (
                  <span className="bg-[#E0F2F1] text-brand-primary text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Novo
                  </span>
                )}
              </div>

              {/* Delete button (only for user added) */}
              {product.isUserAdded && (
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  title="Excluir Produto"
                  className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div>
                {/* Product Image */}
                <div className="relative rounded-[24px] overflow-hidden aspect-square bg-brand-bg mb-4 border border-brand-primary-light">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Details */}
                <div className="space-y-2 px-1">
                  <h4 className="text-sm font-black text-brand-primary-dark line-clamp-2 min-h-[40px] group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-brand-text font-semibold leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 mt-4 border-t border-brand-primary-light flex items-center justify-between px-1">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Preço à vista</span>
                  <span className="text-lg font-black text-brand-accent">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyWhatsapp(product)}
                  className="inline-flex items-center space-x-1 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Comprar</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-[32px] border border-brand-primary-light p-8">
          <div className="w-12 h-12 rounded-full bg-brand-primary-light flex items-center justify-center text-brand-primary mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-brand-primary-dark">Nenhum produto encontrado</h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto font-semibold">
            Não encontramos nenhum item cadastrado ou correspondente aos termos de busca aplicados. Tente ajustar o filtro.
          </p>
        </div>
      )}

    </div>
  );
}
