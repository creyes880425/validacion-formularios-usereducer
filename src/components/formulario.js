import React, { useReducer } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';

const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

function reducer(state, action) {
    return {
        ...state,
        [action.type]: { value: action.value, error: action.error} 
    };
}

export default function Formulario() {

    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        const { name, value } = e.target;
        let error = null;
        const nameFormat = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        switch (name) {
            case 'firstName':
                if (value.length > 0 && !nameFormat.test(value)) {
                    error = 'El nombre ingresado no es válido.'
                } 
                break;
            case 'lastName':
                if (value.length > 0 && !nameFormat.test(value)) {
                    error = 'El apellido ingresado no es válido.'
                } 
                break;
            case 'email':                
                if (value.length > 0 && !mailformat.test(value))
                {
                    error = 'El correo ingresado no es válido.';
                }
                break;
            default:
                error = null;
        }    
        dispatch({
            type: name,
            value: value,
            error: error
        });
    } 

    return (
        <Row>            
            <Col md={{offset: 3, size: 6 }} sm="12">
                <Form>
                    <FormGroup>
                        <Label htmlFor="firstName">
                            Nombre
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={state.firstName.value}
                            onChange={handleChange}
                            type="text"
                        />
                        {state.firstName.error !== null && (<p className="text-danger">{state.firstName.error}</p>)}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="lastName">
                            Apellido
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={state.lastName.value}
                            onChange={handleChange}
                        />
                        {state.lastName.error !== null && (<p className="text-danger">{state.lastName.error}</p>)}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">
                            Correo
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            value={state.email.value}
                            onChange={handleChange}
                        />
                        {state.email.error !== null && (<p className="text-danger">{state.email.error}</p>)}
                    </FormGroup>
                    <Button color="primary">
                        Submit
                    </Button>                    
                </Form>
            </Col>
            <Col md={{offset: 3, size: 6 }} sm="12">
                {JSON.stringify(state)}
            </Col>            
        </Row>
        
    )
}
