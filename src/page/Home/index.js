import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import Header from '../../components/Header';

import { Container, ContainerList, Item, ImgBook, TitleBook, ContainerInfos, AuthorBook, ButtonAdd } from './styles';

import { GetAllBook } from '../../services/bookService';
import { useToast } from '../../hooks/toast';

function Home() {
  const [books, setBooks] = useState(null);
  const { addToast } = useToast();
  
  const LoadContent = async () => {
    try{
        const result = await GetAllBook();
        console.log(result);
        if(result === null){
            addToast({
                type: 'error',
                title: 'Erro ao carregar as informacoes',
                description:
                  'Ooops, ocorreu um error ao buscar as informacoes dos livros.',
            });
        }else{
            setBooks(result.data);
        }
    } catch(Exception) {
        addToast({
            type: 'error',
            title: 'Erro ao carregar as informacoes',
            description:
              'Ooops, ocorreu um error ao buscar as informacoes dos livros.',
        });
    }
  }

  useEffect(() => {
    LoadContent();
  }, []);

  return (
    <Container>
        <Header />
        <ContainerList>
            { books !== null &&
                books.map((item, id) => (
                    <Item key={id}>
                        <ImgBook src={item.thumbnail}/>
                        <ContainerInfos>
                            <TitleBook>{item.title}</TitleBook>
                            <AuthorBook>por {item.authors} | {format(new Date(item.publishedDate), 'dd/MM/yyyy')}</AuthorBook>
                        </ContainerInfos>
                    </Item>
                ))
            }
            
        </ContainerList>
        
        <ButtonAdd>
            +
        </ButtonAdd>
    </Container>
  );
}

export default Home;