import styled from "styled-components";

export const Text = styled.div`
  margin-bottom: 20px;

`;

export const Container = styled.div`
  margin-left: 15%;
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 200px;
  overflow-y: auto;
  margin-top: 100px;
`;

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Form = styled.form`
  background-color: #f1f5f9;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  width: 100%;
 
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

