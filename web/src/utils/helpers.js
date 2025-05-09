export function formatarDataSimples(data) {
    console.log('📅 Formatar data:', data);
    if (!data || !(data instanceof Date) || isNaN(data.getTime())) {
      return 'Data inválida';
    }
  
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }