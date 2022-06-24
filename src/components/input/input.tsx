import { IonInput } from '@ionic/react';
import { } from 'ionicons/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './input.css';

const InputField: React.FC = () => {
    const [text, setText] = useState<string>();
    return (
        <IonInput
            value={text}
            onIonChange={e => setText(e.detail.value!)}
            clearInput autoCapitalize='word'
            autocomplete='name'
            inputMode='text'
            minlength={1}
            name='name'
        >

        </IonInput>
    );
}