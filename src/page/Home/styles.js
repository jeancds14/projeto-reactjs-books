import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const ContainerList = styled.ul`
  padding: 0;
  text-decoration: none;
  padding: 20px;
  width: 100%;
`;

export const Item = styled.li`
  padding: 0;
  text-decoration: none;
  display: flex;
  padding: 20px;
  width: 100%;

  & + li {
    border-top: 1px solid #ccc;
  }
`;

export const ImgBook = styled.img`

`;

export const ContainerInfos = styled.div`
    padding-left: 15px;
    display: flex;
    flex-direction: column;
`;

export const TitleBook = styled.span`
  padding: 0;
  text-decoration: none;
`;

export const Title = styled.div`
  font-size: 28px;
  margin: 10px 20px;
`;

export const AuthorBook = styled.span`
  color:  #595959;
  font-size: 11px;
`;

export const ButtonAdd = styled.div`
  position: fixed;
  display: flex;
  font-size: 50px;
  align-items: center;
  justify-content: center;
  color: #fff;
  right: 20px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #ff9000;
  cursor: pointer;
`;