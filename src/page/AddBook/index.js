import React, { useRef, useState } from 'react';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { CreateBook } from '../../services/bookService';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { useHistory } from 'react-router-dom';

import { Container } from './styles';
import { parse } from 'date-fns';

function AddBook() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();
  
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    setLoading(true);

    // eslint-disable-next-line no-unused-expressions
    formRef.current?.setErrors({});
    console.log(data);
    data.pagecount = parseInt(data.pagecount);

    try{

        //await schema.validate(data, { abortEarly: false });

        const result = await CreateBook(data);
        console.log(result);
        setLoading(false);
        if(result !== null) {
            addToast({
                type: 'success',
                title: 'Livro salvo',
                description:
                'Livro salvo com sucesso!',
            });
            history.push('/home');
        }else{
            addToast({
                type: 'error',
                title: 'Erro ao salvar',
                description:
                'Ooops, ocorreu um erro ao salvar o livro.',
            });
        }
    }catch(err) {
       setLoading(false);
    
        if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            // eslint-disable-next-line no-unused-expressions
            formRef.current?.setErrors(errors);
            return;
        }

        addToast({
            type: 'error',
            title: 'Erro ao salvar',
            description:
            'Ooops, ocorreu um erro ao salvar o livro.',
        });
    }

  }

  return ( 
    <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="title" placeholder="Titulo do livro" />
            <Input name="subTitle" placeholder="Subtitulo do livro" />
            <Input name="authors" placeholder="Autor do livro" />
            <Input name="smallThumbnail" placeholder="Thumbnail pequena" />
            <Input name="publishedDate" placeholder="Data de lancamento" />
            <Input name="description" placeholder="Descricao" />
            <Input name="isbn_10" placeholder="ISBN 10" />
            <Input name="isbn_13" placeholder="ISBN 13" />
            <Input name="publisher" placeholder="Editor" />
            <Input name="pagecount" type="number" placeholder="Paginas" />
            <Input name="thumbnail" placeholder="Thumbnail" />

            <Button type="submit" loading={loading}>Entrar</Button>
        </Form>
    </Container>
  );
}

export default AddBook;