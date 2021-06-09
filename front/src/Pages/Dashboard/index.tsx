import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { Container } from './styles'
import api from '../../services/api';

interface NewInFormData {
  id: string;
  disciplina: string;
  professor: string;
  dia_semana: string;
  periodo: string;
  horario: string
}

const Dashboard: React.FC = () => {

    const [professores, setProfessores] = useState<NewInFormData[]>([])

    useEffect(() => {
      api.get('professores').then(response => {
        setProfessores(response.data)
      })
    }, [])
 

  let professorUnico = []
  professorUnico = Array.from(new Set(professores.map(prof => prof)))
 
  return (
    <>
      <Header />
      <Container>
        <ul>
          {professorUnico.map((info, index) => (
            <li key={index.toString()}>
              <Link to={`/details/${info.id}`}>{info.professor}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}

export default Dashboard;
