import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

import illustration1 from "@/assets/illustration-1.jpg";
import illustration2 from "@/assets/illustration-2.jpg";
import illustration3 from "@/assets/illustration-3.jpg";
import illustration4 from "@/assets/illustration-4.jpg";
import carouselYang from "@/assets/carousel-yang.jpg";
import heroStudio from "@/assets/hero-studio.jpg";

const portfolioItems = [
  { id: 1, image: illustration1, title: "Dragão Oriental", tags: ["fantasia", "personagens", "yang"] },
  { id: 2, image: illustration2, title: "Cidade Cartum", tags: ["urbano", "cenário", "editorial"] },
  { id: 3, image: illustration3, title: "Floresta Encantada", tags: ["infantil", "natureza", "animais"] },
  { id: 4, image: illustration4, title: "Grupo de Amigos", tags: ["humor", "personagens", "editorial"] },
  { id: 5, image: carouselYang, title: "Yang em Ação", tags: ["yang", "ação", "fantasia"] },
  { id: 6, image: heroStudio, title: "Estúdio do Artista", tags: ["processo", "arte", "bastidores"] },
];

const allTags = Array.from(new Set(portfolioItems.flatMap(item => item.tags)));

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<typeof portfolioItems[0] | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Portfólio
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a galeria de ilustrações, cartuns e artes criados ao longo de duas décadas de trabalho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ilustrações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer capitalize transition-all ${
                    selectedTags.includes(tag) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                  className="text-destructive hover:text-destructive"
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-artistic group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-semibold text-foreground mb-2">{item.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhuma ilustração encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6 text-background" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage.image}
            alt={selectedImage.title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </Layout>
  );
}
