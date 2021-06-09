import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 0 30px;
  border: 1px solid #ff9000;
  margin-top: 30px;
`;
export const Disciplinas = styled.div`
  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .Voltar {
    background-color: transparent;
    border: none;
    transition-duration: 0.2s;
    position: relative;
    top: -135px;
    left: -65px;
    border-radius: 10px;

  }
  .Voltar:hover{
    background-color: #3c3845
  }
  .Alterar {
    background-color: transparent;
    border: none;
    transition-duration: 0.2s;
    position: relative;
    height: 41px;
    width: 40px;
    border-radius: 15px;

  }
  .Alterar:hover{
    background-color: #3C3B3B
  }
  .Excluir {
    background-color: transparent;
    border: none;
    transition-duration: 0.4s;
    position: relative;
    top: -135px;
    right: -500px;
  border-radius: 10px;
  
  }
  .Excluir:hover{
    background-color: #3c3845
  }
`;
