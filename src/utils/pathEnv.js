const getPath = () => {
    // Verifique aqui o ambiente
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8080';
    } else if (process.env.NODE_ENV === 'production') {
      return 'https://receitas-back-lzdb.onrender.com';
    } else {
      // Ambiente padrão, se não for desenvolvimento nem produção
      return 'http://localhost:8080';
    }
  };
  
  export default getPath;