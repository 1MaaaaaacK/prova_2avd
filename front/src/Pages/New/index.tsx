import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles'
import api from '../../services/api';

interface NewInFormData {
  disciplina: string;
  professor: string;
  dia_semana: string;
  periodo: string;
  horario: string;
}

const New: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: NewInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        disciplina: Yup.string().required('Disciplina obrigatória'),
        professor: Yup.string().required('Professor obrigatório'),
        dia_semana: Yup.string().required('Dia Semana obrigatório'),
        periodo: Yup.string().required('Periodo obrigatório'),
        horario: Yup.string().required('Horário obrigatório')
      })
       await schema.validate(data, {
        abortEarly: false,
      }); 
      
      
      
      formRef.current?.reset()
     const idGet = await api.post('/professores', data)

     history.push(`/dashboard`);

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Professor cadastrado com sucesso!!',
      });
    }  catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro no Cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Cadastro Professores/Disciplina</h1>
        <Input name="professor" placeholder="Professor" />
        <Input name="disciplina" placeholder="Disciplina" />
        <Input name="dia_semana" placeholder="Dia Semana" />
        <Input name="periodo" placeholder="Periodo" />
        <Input name="horario" placeholder="Horario" />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  )
}

export default New