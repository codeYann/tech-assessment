import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2564cf;
`;
export const MenuNav = styled.nav`
    cursor: pointer;
    p {
        color: white;
        font-size: 16px;
    }
`;

export const MenuSearchContainer = styled.div`
    text-align: center;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
`;

export const UserIcon = styled.div`
    font-size: 24px;
    color: white;
    cursor: pointer;
`;

export const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
