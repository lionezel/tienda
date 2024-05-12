import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.nav`
  background-color: white;
  color: black;
  width: 15%;
  margin-right: 20px;
  text-align: center;
  align-items: stretch;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2); 

  @media (max-width: 768px) {
    width: 80px;
  }
`;

export const Content = styled.div`
  margin-left: 15%; /* Espacio para el Navbar */
  width: 85%; /* Ajuste del ancho del contenido */
  height: 100vh;
  padding: 20px;
  overflow-y: auto; /* Añadido para permitir el desplazamiento si el contenido es más largo que la pantalla */

  @media (max-width: 768px) {
    margin-left: 80px;
    width: calc(100% - 80px);
  }
`;

export const CustomLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;

  &.active {
    width: 100%;
    border-radius: 5px;
    color: white; 
    background: linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%);
    box-shadow: 0px 2px 6px 0px rgba(115,103,240,.48);
    text-align: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;

    &:hover {
      width: 100%;
    }
  }
`;

export const Title = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    display: none;
  }
`;
