import { IonInput, IonItem, IonSelect, IonSelectOption, IonTextarea } from "@ionic/react"
import styled from "styled-components"
import Color from "./color";

const Input = styled(IonInput)`
    // --placeholder-font-weight: lighter;
    margin: 8px 0;
    input:focus {
        box-shadow: 0px 0px 0px 5px ${Color.shadow.input};
    }
    `;

const TextArea = styled(IonTextarea)`
    `;

const Select = styled(IonSelect)`
    border: 1px solid ${Color.input.border};
    `;

const ItemInput = styled(IonItem)`
    margin: 2rem 0;
    border: 1px solid ${Color.input.border};
    --border-style: unset;
`;

export { TextArea, Select, Input, ItemInput }