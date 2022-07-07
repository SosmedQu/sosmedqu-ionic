import { IonSegment } from "@ionic/react";
import styled from "styled-components";
import Color from "./color";

const Segment = styled(IonSegment)`
  // box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.3), 4px -4px 4px rgba(0, 0, 0, 0.3);
  --background: var(--ion-color-light);
`;

const BoxSegment = styled.div`
  background-color: var(--ion-color-contras-rgb);
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;

  .rounded{
    width: 60%;
    border-radius: 20px !important;
    margin: 8px 0 0 0;
  }
`;


export { Segment, BoxSegment };
