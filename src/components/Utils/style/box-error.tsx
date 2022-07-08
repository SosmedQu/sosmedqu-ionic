import styled from "styled-components";
import Color from "./color";

const BoxError = styled.div`
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Color.primary.blackLight};
    font-weight: bold;
`;

export { BoxError };