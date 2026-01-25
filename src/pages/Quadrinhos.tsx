import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

import bookYang1 from "@/assets/book-yang-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import carouselYang from "@/assets/carousel-yang.jpg";
import carouselCartoons from "@/assets/carousel-cartoons.jpg";

const comics = [
  {
    id: 1,
    title: "O Mundo de Yang - Vol. 1",
    cover: bookYang1,
    synopsis: "Yang é um jovem guerreiro que descobre seu destino ao encontrar uma espada mágica numa floresta de bambu. Esta primeira aventura o leva a enfrentar os temidos Senhores da Sombra enquanto descobre segredos sobre sua própria família.",
    pages: [carouselYang, bookYang1],
    year: 2020,
    status: "Completo",
  },
  {
    id: 2,
    title: "Crônicas Urbanas",
    cover: book2,
    synopsis: "Uma coletânea de histórias curtas que retratam o cotidiano nas grandes cidades brasileiras. Humor, crítica social e personagens memoráveis se encontram nestas páginas cheias de vida.",
    pages: [book2, carouselCartoons],
    year: 2019,
    status: "Completo",
  },
  {
    id: 3,
    title: "Bichos da Floresta",
    cover: book3,
    synopsis: "Uma fábula encantadora sobre um grupo de animais que precisa trabalhar junto para salvar sua floresta. Uma história sobre amizade, cooperação e respeito à natureza.",
    pages: [book3],
    year: 2021,
    status: "Completo",
  },
];

export default function Quadrinhos() {
  const [selectedComic, setSelectedComic] = useState<typeof comics[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const openComic = (comic: typeof comics[0]) => {
    setSelectedComic(comic);
    setCurrentPage(0);
  };

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
              Quadrinhos
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça as histórias em quadrinhos criadas por Orlandeli. Clique em cada título para ler a sinopse e ver algumas páginas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comics Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comics.map((comic, idx) => (
              <motion.div
                key={comic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="card-artistic group cursor-pointer"
                onClick={() => openComic(comic)}
              >
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg relative">
                  <img 
                    src={comic.cover} 
                    alt={comic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <Button variant="secondary" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{comic.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{comic.year}</span>
                    <span className="text-primary font-medium">{comic.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comic Detail Modal */}
      <Dialog open={!!selectedComic} onOpenChange={() => setSelectedComic(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedComic && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">{selectedComic.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Cover */}
                <div className="image-frame aspect-[2/3]">
                  <img 
                    src={selectedComic.cover} 
                    alt={selectedComic.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Sinopse</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedComic.synopsis}</p>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ano:</span>
                      <span className="ml-2 font-medium">{selectedComic.year}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2 font-medium text-primary">{selectedComic.status}</span>
                    </div>
                  </div>

                  {/* Page Preview */}
                  <div className="pt-4">
                    <h4 className="font-semibold text-foreground mb-3">Páginas de Amostra</h4>
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={selectedComic.pages[currentPage]} 
                        alt={`Página ${currentPage + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {selectedComic.pages.length > 1 && (
                        <div className="absolute inset-x-0 bottom-0 flex justify-between p-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="bg-background/80 px-3 py-1 rounded text-sm">
                            {currentPage + 1} / {selectedComic.pages.length}
                          </span>
                          <Button
                            variant="secondary"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.min(selectedComic.pages.length - 1, prev + 1))}
                            disabled={currentPage === selectedComic.pages.length - 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
