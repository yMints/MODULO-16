interface ProdutoCardProps {
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

function ProdutoCard({
  nome,
  preco,
  imagem,
  descricao,
}: ProdutoCardProps) {
  return (
    <article className="produto-card">
      <img src={imagem} alt={`Imagem do produto ${nome}`} />

      <div className="produto-info">
        <h3>{nome}</h3>
        <p>{descricao}</p>
        <strong>
          R$ {preco.toFixed(2).replace(".", ",")}
        </strong>
      </div>
    </article>
  );
}

export default ProdutoCard;