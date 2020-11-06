import React, { useRef, useCallback, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Box, Title } from './styles';

function Register() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const history = useHistory();

  const { signUp } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await signUp({
          email: data.email,
          password: data.password,
        });

        history.push('/home');
      } catch (error) {
        setLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors(errors);
          return;
        }
        
        if (error.response) {
          if(error.response.status === 409){
            addToast({
              type: 'error',
              title: 'Erro na cadastro',
              description: 'E-mail já cadastrado. Caso não lembre da sua senha clique em Esqueci minha senha.',
            });
          }else{
            addToast({
              type: 'error',
              title: 'Erro na cadastro',
              description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
            });
          }
        }else{
          addToast({
            type: 'error',
            title: 'Erro na cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      }
    },
    [addToast, history, signUp],
  );

  return (
    <Container>
    <Box>
        <Title>Cadastro</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
                name="password"
                type="password"
                icon={FiLock}
                placeholder="Senha"
            />

            <Button type="submit" loading={loading}>Salvar</Button>
        </Form>
    </Box>
</Container>
  );
}

export default Register;