const fs = require('fs');

// Função para gerar uma data aleatória entre duas datas
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Função para formatar a data no formato "dd/mm/aaaa"
function formatDate(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Define o intervalo para DataEntrada: de 1º de novembro de 2024 até hoje
const startInterval = new Date('2024-11-01');
const endInterval = new Date();

// Lê o arquivo original de pedidos
const data = JSON.parse(fs.readFileSync('pedidos.json', 'utf8'));

// Atualiza cada pedido
data.pedidos = data.pedidos.map(pedido => {
  // Gera uma data aleatória para DataEntrada
  const randomDataEntrada = getRandomDate(startInterval, endInterval);
  pedido.DataEntrada = formatDate(randomDataEntrada);

  // Calcula o Vencimento: 30 dias após a DataEntrada
  const dataVencimento = new Date(randomDataEntrada);
  dataVencimento.setDate(dataVencimento.getDate() + 30);
  pedido.Vencimento = formatDate(dataVencimento);

  return pedido;
});

// Salva o novo arquivo JSON com os dados atualizados
fs.writeFileSync('pedidos-atualizados.json', JSON.stringify(data, null, 2));
console.log('Arquivo atualizado gerado: pedidos-atualizados.json');
