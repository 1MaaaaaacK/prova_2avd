import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Disciplinas } from './styles'
import { useRouteMatch, useHistory } from 'react-router-dom'
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AiOutlineLeft } from 'react-icons/ai'
import { BsFillTrashFill, BsPlusCircle, BsDashCircle } from 'react-icons/bs'


interface ProfessoresParametros {
  id: string
}

interface Cadastro {
  disciplina: string;
  professor: string;
  dia_semana: string;
  periodo: string;
  horario: string;
}

const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>();
  const [professores, setProfessores] = useState<Cadastro>()
  const [showForm, setShowForm] = useState(false);
  const [buttonChange, setbuttonChange] = useState(false);


  useEffect(() => {
    api.get(`professores/${params.id}`).then(response => {
      setProfessores(response.data)
    })
  }, [])

  const history = useHistory();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Cadastro) => {
    
    await api.patch(`professores/${params.id}`, data)
  
     history.push(`/dashboard`);

      addToast({
        type: 'success',
        title: 'Alteração realizada com Sucesso',
        description: 'Professor cadastrado com sucesso!!',
      });
  
  }, [addToast, history]);
  

const showForms = () => {
  setShowForm(!showForm)
  setbuttonChange(!buttonChange)
}
  return (
    <Container>
      <Disciplinas>
        <ul>
            <li>
              <span>Professor: {professores?.professor}</span>
              <span>Disciplina: {professores?.disciplina}</span>
              <span>Dia Semana: {professores?.dia_semana}</span>
              <span>Periodo: {professores?.periodo}</span>
              <span>Horario: {professores?.horario}</span>
            </li>
           <button className="Excluir" onClick={async () => { 
             addToast({
              type: 'success',
              title: 'Excluído com Sucesso',
              description: 'Professor excluído com sucesso!!',
              });
             await api.delete(`/professores/${params.id}`)
             history.push('/dashboard')
             }}><BsFillTrashFill size="40" color="FF360D"/></button>

            <button className="Voltar" onClick={() => { 
              history.push('/dashboard')
              }}><AiOutlineLeft size="25" /> </button>

              <button className="Alterar" onClick={showForms} >{!buttonChange ? <BsPlusCircle size="20"/> : <BsDashCircle size="20"/>}</button>
        </ul>
        {showForm && (
          <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="professor" placeholder="Professor" defaultValue={professores?.professor}/>
          <Input name="disciplina" placeholder="Disciplina" defaultValue={professores?.disciplina}/>
          <Input name="dia_semana" placeholder="Dia Semana" defaultValue={professores?.dia_semana}/>
          <Input name="periodo" placeholder="Periodo" defaultValue={professores?.periodo}/>
          <Input name="horario" placeholder="Horario" defaultValue={professores?.horario}/>
          <Button type="submit">Alterar</Button>
        </Form>
        )}
      </Disciplinas>
    </Container>
  )
}

export default Details;
