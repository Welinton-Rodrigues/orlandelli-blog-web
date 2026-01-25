import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ExternalLink } from "lucide-react";

import bookYang1 from "@/assets/book-yang-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

const products = [
  {
    id: 1,
    title: "O Mundo de Yang - Vol. 1",
    image: bookYang1,
    price: 49.90,
    originalPrice: 59.90,
    description: "A aventura épica de Yang começa aqui. Edição especial com capa dura.",
    inStock: true,
    type: "venda",
  },
  {
    id: 2,
    title: "Crônicas Urbanas",
    image: book2,
    price: 39.90,
    description: "Coletânea completa de histórias do cotidiano brasileiro.",
    inStock: true,
    type: "venda",
  },
  {
    id: 3,
    title: "Bichos da Floresta",
    image: book3,
    price: 35.90,
    description: "Livro infantil ilustrado. Ideal para leitura em família.",
    inStock: true,
    type: "venda",
  },
  {
    id: 4,
    title: "O Mundo de Yang - Vol. 2",
    image: bookYang1,
    price: 0,
    catarseGoal: 80,
    catarseUrl: "https://catarse.me/yang2",
    description: "A continuação da saga! Apoie este projeto no Catarse.",
    inStock: false,
    type: "catarse",
  },
];

export default function Loja() {
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
              Loja
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Adquira os livros e produtos do Orlandeli. Também apoie projetos em financiamento coletivo!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Available for Sale */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Disponíveis para Compra</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => p.type === "venda").map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-artistic"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-t-lg relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-serif text-lg font-semibold text-foreground">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                    <Button className="w-full btn-wood">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Catarse Projects */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Projetos no Catarse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.filter(p => p.type === "catarse").map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-artistic flex flex-col md:flex-row overflow-hidden"
                >
                  <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6 space-y-4">
                    <Badge variant="outline" className="bg-sage-light text-sage border-sage">
                      Financiamento Coletivo
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{product.title}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                    
                    {product.catarseGoal && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium text-primary">{product.catarseGoal}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${product.catarseGoal}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Apoiar no Catarse
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
