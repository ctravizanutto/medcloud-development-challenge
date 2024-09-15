import {useState, FormEvent, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import {FormErrors, FormData} from "../../interfaces/form.interfaces.ts";
import MuiTextInput from "../../components/MuiCustom/MuiTextField.tsx";
import MuiDatePicker from "../../components/MuiCustom/MuiDatePicker.tsx";
import MuiMaskedInput from "../../components/MuiCustom/MuiMaskedInput.tsx";
import {http, viaCep} from "../../http";
import MuiSelect from "../../components/MuiCustom/MuiSelect.tsx";
import toast from "react-hot-toast";
import {useParams} from "react-router";
import dayjs from "dayjs";
import {Patient} from "../../interfaces/patient.interface.ts";
import {states} from "./data.ts";

export default function Index() {
    const {id} = useParams()

    useEffect(() => {
        async function fetchPatient() {
            await http.get<Patient>(`/${id}`).then((patient) => {
                setFormData({
                    name: patient.data.name,
                    email: patient.data.email,
                    birthday: dayjs(patient.data.birthday),
                    street: patient.data.address[0].street,
                    cep: patient.data.address[0].cep,
                    city: patient.data.address[0].city,
                    number: patient.data.address[0].number,
                    state: patient.data.address[0].state,
                    neighborhood: patient.data.address[0].neighborhood
                })
            })
        }

        if (id) {
            toast.promise(
                fetchPatient(),
                {
                    loading: 'Carregando...',
                    success: <b>Paciente carregado</b>,
                    error: <b>Não foi possível carregar o paciente</b>,
                }
            ).then()
        }
    }, [id]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        birthday: null,
        street: '',
        number: '',
        city: '',
        state: '',
        cep: '',
        neighborhood: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (formData.cep.replace('_', '').length === 9) {
            viaCep.get(`${formData.cep}/json`)
                .then((response) => {
                    if (response.data.erro) {
                        return toast.error("CEP inválido")
                    }
                    setFormData((prev) => ({
                        ...prev,
                        street: response.data.logradouro,
                        city: response.data.localidade,
                        neighborhood: response.data.bairro,
                        state: response.data.uf
                    }))
                })

        }
    }, [formData.cep]);

    const validate = (): boolean => {
        const tempErrors: FormErrors = {};
        if (!formData.name) tempErrors.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Valid email is required';
        if (!formData.birthday) tempErrors.birthday = 'Birthday is required';
        if (!formData.street) tempErrors.street = 'Address is required';
        if (!formData.neighborhood) tempErrors.neighborhood = 'Address is required';
        if (!formData.number || isNaN(Number(formData.number))) tempErrors.number = 'Valid number is required';
        if (!formData.city) tempErrors.city = 'City is required';
        if (!formData.state) tempErrors.state = 'State is required';
        if (!formData.cep || formData.cep.length !== 9) tempErrors.cep = 'Valid CEP is required';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true)
            const patient = {
                name: formData.name,
                email: formData.email,
                birthday: formData.birthday,
                address: {
                    street: formData.street,
                    neighborhood: formData.neighborhood,
                    state: formData.state,
                    cep: formData.cep,
                    number: formData.number,
                    city: formData.city
                }
            }
            toast.promise(
                id ? http.put(`/${id}`, patient) : http.post('/', patient),
                {
                    loading: 'Salvando...',
                    success: <b>Paciente enviando</b>,
                    error: <b>Não foi possível completar a requisição</b>,
                }
            )
                .finally(() => setIsSubmitting(false))
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: 2,
                 width: '100%',
                 padding: '40px 15%',
                 boxSizing: 'border-box'
             }}>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center', width: '100%'}}>
                <MuiTextInput label={"Name"} value={formData} setValue={setFormData} name={"name"} errors={errors}/>
                <MuiDatePicker label={"Birthday"} value={formData} setValue={setFormData} name={"birthday"}
                               errors={errors}/>
            </Box>

            <MuiTextInput label={"Email"} value={formData} setValue={setFormData} name={"email"}
                          errors={errors}/>

            <MuiMaskedInput label={"Cep"} value={formData.cep} setValue={setFormData} name={"cep"} errors={errors}
                            mask={'99999-999'} maskChar={'_'} state={formData}/>

            <MuiTextInput label={"Street"} value={formData} setValue={setFormData} name={"street"}
                          errors={errors}/>

            <MuiTextInput label={"Neighborhood"} value={formData} setValue={setFormData} name={"neighborhood"}
                          errors={errors}/>

            <MuiTextInput label={"City"} value={formData} setValue={setFormData} name={"city"}
                          errors={errors}/>
            <MuiSelect label={"State"} value={formData} presetValues={states} setValue={setFormData} name={"state"}
                       errors={errors}/>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center', width: '100%'}}>

                <MuiTextInput label={"Number"} value={formData} setValue={setFormData} name={"number"} errors={errors}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="submit" variant="contained" disabled={isSubmitting} sx={{width: '25%'}}>Submit</Button>
            </Box>
        </Box>
    )
}
