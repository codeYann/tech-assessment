import styled from "styled-components";

export const TaskFormContainer = styled.div`
    width: 90%;
    height: 120px;
    border-top: none;
    border-left: 0.1px solid #8a8886;
    border-right: 0.1px solid #8a8886;
    border-bottom: 0.1px solid #8a8886;
    border-radius: 4px;
    margin: 15px auto;
    background: #fff;
`;

export const TaskForm = styled.form`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 101%;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    gap: 15px;
    width: 99%; 
    margin-top: 10px;
`;

export const Input = styled.input`
    width: 75%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%; 
`;

export const Button = styled.button`
    width: 10%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0px 6px 8px 0px;
    &:hover {
        background-color: #0056b3;
    }
`;
