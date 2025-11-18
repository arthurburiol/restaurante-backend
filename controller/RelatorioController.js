import banco from "../banco.js";

// Relatório por itens
async function vendasPorItens(req, res) {
  try {
    const [resultado] = await banco.query(`
      SELECT 
        p.nome,
        SUM(ci.quantidade) AS quantidade_vendida,
        SUM(ci.valor_unitario * ci.quantidade) AS total_faturado
      FROM comanda_itens ci
      JOIN produtos p ON p.id = ci.id_produto
      WHERE DATE(ci.tempo_pedido) = CURRENT_DATE
      GROUP BY p.nome
      ORDER BY total_faturado DESC
    `);

    res.json(resultado);

  } catch (erro) {
    console.error("Erro ao gerar relatório:", erro);
    res.status(500).json({ erro: "Erro ao gerar relatório" });
  }
}

// Relatório total do dia
async function valorTotalDoDia(req, res) {
  try {
    const [resultado] = await banco.query(`
      SELECT 
        SUM(ci.quantidade * ci.valor_unitario) AS total_do_dia
      FROM comanda_itens ci
      WHERE DATE(ci.tempo_pedido) = CURRENT_DATE
    `);

    res.json(resultado[0]); // retorna { total_do_dia: "123.45" }

  } catch (erro) {
    console.error("Erro ao calcular total do dia:", erro);
    res.status(500).json({ erro: "Erro ao calcular total do dia" });
  }
}

export default { vendasPorItens, valorTotalDoDia };
