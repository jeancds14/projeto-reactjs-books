import React, { useRef, useCallback, useState } from 'react';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';


import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Box, Title } from './styles';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const history = useHistory();

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data) => {
          try {
            setLoading(true);
            // eslint-disable-next-line no-unused-expressions
            formRef.current?.setErrors({});
    
            const schema = Yup.object().shape({
              email: Yup.string()
                .required('E-mail é obrigatório')
                .email('Digite um e-mail válido'),
              password: Yup.string()
                .required('Senha é obrigatória')
                .min(5, 'Mínimo de 5 caracteres.'),
            });
    
            await schema.validate(data, { abortEarly: false });
    
            await signIn({
              email: data.email,
              password: data.password,
            });
    
            history.push('/home');
          } catch (err) {
            setLoading(false);
    
            if (err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err);
    
              // eslint-disable-next-line no-unused-expressions
              formRef.current?.setErrors(errors);
              return;
            }
    
            addToast({
              type: 'error',
              title: 'Erro na autenticação',
              description:
                'Ooops, ocorreu um error ao fazer login, cheque as credenciais.',
            });
          }
        },
        [signIn, addToast, history],
      );
    
    

    return (
        <Container>
            <Box>
                <Title>Login</Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input
                        name="password"
                        type="password"
                        icon={FiLock}
                        placeholder="Senha"
                    />

                    <Button type="submit" loading={loading}>Entrar</Button>
                </Form>
            </Box>
        </Container>
    );
}