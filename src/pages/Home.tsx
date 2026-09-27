import { FormEvent, useEffect, useState } from "react";
import ProdutoCard from "../components/ProdutoCard";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

const produtosMock: Produto[] = [
  {
    id: 1,
    nome: "Notebook",
    preco: 3500,
    imagem: "https://placehold.co/600x400?text=Notebook",
    descricao: "Notebook para estudos e trabalho.",
  },
  {
    id: 2,
    nome: "Smartphone",
    preco: 1800,
    imagem: "https://placehold.co/600x400?text=Smartphone",
    descricao: "Smartphone moderno e rápido.",
  },
  {
    id: 3,
    nome: "Fone de ouvido",
    preco: 250,
    imagem: "https://placehold.co/600x400?text=Fone",
    descricao: "Fone confortável com ótima qualidade de som.",
  },
];

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProdutos(produtosMock);
      setCarregando(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  function cadastrarProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const precoNumerico = Number(preco);

    if (!nome.trim() || !preco || !descricao.trim() || precoNumerico <= 0) {
      return;
    }

    const novoProduto: Produto = {
      id: Date.now(),
      nome: nome.trim(),
      preco: precoNumerico,
      imagem: `https://placehold.co/600x400?text=${encodeURIComponent(nome.trim())}`,
      descricao: descricao.trim(),
    };

    setProdutos((produtosAtuais) => [...produtosAtuais, novoProduto]);

    setNome("");
    setPreco("");
    setDescricao("");
  }

  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow">REACT + TYPESCRIPT</p>
        <h1>Catálogo de Produtos</h1>
        <p className="hero-text">
          Cadastre e visualize produtos de forma simples e dinâmica.
        </p>
      </header>

      <section className="form-section">
        <div className="section-heading">
          <h2>Cadastrar Produto</h2>
          <p>Preencha os campos abaixo para adicionar um produto.</p>
        </div>

        <form onSubmit={cadastrarProduto}>
          <label>
            Nome
            <input
              type="text"
              placeholder="Ex.: Teclado mecânico"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </label>

          <label>
            Preço
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Ex.: 299.90"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              placeholder="Descreva o produto..."
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
            />
          </label>

          <button type="submit">Cadastrar produto</button>
        </form>
      </section>

      <section className="products-section">
        <div className="section-heading">
          <h2>Produtos</h2>
          {!carregando && (
            <span className="product-count">
              {produtos.length} {produtos.length === 1 ? "produto" : "produtos"}
            </span>
          )}
        </div>

        {carregando ? (
          <div className="loading">
            <div className="spinner" />
            <p>Carregando...</p>
          </div>
        ) : (
          <div className="produtos">
            {produtos.map((produto) => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                descricao={produto.descricao}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;