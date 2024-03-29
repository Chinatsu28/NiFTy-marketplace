import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { Box, Button, Divider, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import styled from 'styled-components';



function CreditCard() {
    // Destructure values from usePaymentInputs hook
    const {
      meta,
      getCardImageProps,
      getCardNumberProps,
      getExpiryDateProps,
      getCVCProps
    } = usePaymentInputs();

    // Styled component for custom styling
    const CreditCard = styled.div`
        .visa_card_container {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: 50px 60px 50px;
            width: 310px;
            margin: auto;
            background: #e1e1eb;
            border: 1px solid rgba(255, 255, 255, 0.20);
            border-radius: 10px;
            padding: 20px 18px;
            box-shadow: 0px 0px 20px rgba(253, 253, 253, 0.2);
            grid-template-areas: "balance visa""cardnumber cardnumber""holder expiry"
        }

        .avail_balance,
        .numeric_balance {
            grid-area: balance;
            margin: 0;
        }

        .visa_icon {
            width: 50px;
            height: 25px;
        }

        .numeric_balance {
            margin-top: 10px;
        }

        .numeric_balance,
        .numeric_balance-2,
        .card_number {
            font-size: 1.1rem;
            font-weight: 500;
            -webkit-text-stroke: .2px;
        }

        .numeric_balance,
        .numeric_balance-2,
        .card_number,
        .owner_name,
        .expiry_date {
            color: #464646;
        }

        .avail_balance,
        .holder_text,
        .expiry_text {
            font-size: .53rem;
            letter-spacing: 1px;
            font-weight: 300;
            color: #a1a1a4;
        }

        .visa_icon {
            grid-area: visa;
        }

        .card_number {
            grid-area: cardnumber;
            letter-spacing: 2.1px;
            display: flex;
            justify-content: space-around;
        }

        .hidden_pin {
            -webkit-text-stroke: 1.4px;
            letter-spacing: 5px;
        }

        .holder_text,
        .owner_name {
            grid-area: holder;
        }

        .expiry_text {
            margin-right: 3.3px;
        }

        .expiry_text,
        .expiry_date {
            display: grid;
            grid-area: expiry;
            justify-content: end;
        }

        .owner_name,
        .expiry_date {
            margin-top: 23px;
            font-size: .77rem;
            letter-spacing: .7px;
            text-transform: uppercase;
            -webkit-text-stroke: .2px;
            line-height: 2;
        }
    `

    return (
        <Box>
            <Divider />
            {/* Formik handles form state and validation */}
            <Formik
                initialValues={
                {cardNumber: "",
                expiryDate: "",
                cvc: "",
                    nameOnCard: ""}
                }

                // Define validation schema using Yup
                validationSchema={
                Yup.object().shape({
                    nameOnCard: Yup.string()
                    .required('Name on card is required')
                    .matches(/^[a-zA-Z\s]+$/, 'Name on card must contain only alphabets and spaces')
                })
                }
                
                // Validate form inputs based on errors returned by meta
                validate={() => {
                let errors = {};
                if (meta.erroredInputs.cardNumber) {
                    errors.cardNumber = meta.erroredInputs.cardNumber;
                }
                if (meta.erroredInputs.expiryDate) {
                    errors.expiryDate = meta.erroredInputs.expiryDate;
                }
                if (meta.erroredInputs.cvc) {
                    errors.cvc = meta.erroredInputs.cvc;
                }
                return errors;
                }}
                onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
                    // Handle form submission
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                <form onSubmit={handleSubmit}>
                    <CreditCard >
                        {/* Credit card styled container */}
                        <section className="visa_card">
                            <div className="visa_card_container">

                                <svg {...getCardImageProps({ images })} className="visa_icon"/>

                                <p className="card_number"> 
                                    <span className="hidden_pin">••••</span>
                                    <span className="hidden_pin">••••</span>
                                    <span className="hidden_pin">••••</span>
                                    <span className="hidden_pin">••••</span>
                                </p>
                                <h3 className="holder_text">HOLDER</h3>
                                <p className="owner_name">{values.nameOnCard}</p>
                                <h3 className="expiry_text">EXPIRY</h3>
                                <p className="expiry_date">{values.expiryDate}</p>
                            </div>
                        </section>
                    </CreditCard>
                    <Stack direction={"column"} spacing={"20px"} sx={{
                        width: "100%" , mt: 5
                    }}>
                        {/* Name on Card */}
                        <FormControl error={Boolean(touched.nameOnCard && errors.nameOnCard)}>
                        <InputLabel>Name on Card</InputLabel>
                        <OutlinedInput
                            type={'text'}
                            id={'nameOnCard'}
                            name={'nameOnCard'}
                            value={values.nameOnCard.toUpperCase()}
                            onChange={handleChange}
                        />
                        {touched.nameOnCard && errors.nameOnCard && (
                            <FormHelperText error>
                            {errors.nameOnCard}
                            </FormHelperText>
                        )}
                        </FormControl>
                        
                        {/* Card Number */}
                        <Field name="cardNumber">
                        {({ field }) => (
                            <TextField
                            {...getCardNumberProps({
                                refKey: "inputRef",
                                onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                            })}
                            inputRef={getCardNumberProps().ref}
                            fullWidth
                            type="tel"
                            label="Card number"
                            variant="outlined"
                            error={
                                Boolean(touched.cardNumber && errors.cardNumber)
                            }
                            helperText={
                                touched.cardNumber && errors.cardNumber && (errors.cardNumber)
                            }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <svg {...getCardImageProps({ images })} />
                                    {console.log(images)}
                                </InputAdornment>
                                )
                            }}
                            />
                        )}
                        </Field>
                        
                        {/* Expiration Date and CVC */}
                        <Stack direction={"row"} spacing={"20px"} sx={{
                            width: "100%"
                        }}>
                            <Field name="expiryDate">
                                {({ field }) => (
                                
                                <TextField
                                    {...getExpiryDateProps({
                                    refKey: "inputRef",
                                    onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                                    })}
                                    inputRef={getExpiryDateProps().ref}
                                    fullWidth
                                    type="tel"
                                    label={"Expiration date"}
                                    variant="outlined"
                                    error={Boolean(touched.expirationDate && errors.expirationDate)}
                                    helperText={
                                    touched.expirationDate && errors.expirationDate && (errors.expirationDate)
                                    }
                                />
                                )}
                            </Field>
                            
                            <Field name="cvc">
                                {({ field }) => (
                                <TextField
                                    {...getCVCProps({
                                    refKey: "inputRef",
                                    onBlur: field.onBlur, onChange: field.onChange, name: field.name, id: field.id
                                    })}
                                    inputRef={getCVCProps().ref}
                                    fullWidth
                                    type="text"
                                    label={"CVC"}
                                    placeholder='CVC'
                                    variant="outlined"
                                    error={Boolean(touched.cvc && errors.cvc)}
                                    helperText={
                                    touched.cvc && errors.cvc && (errors.cvc)
                                    }
                                />
                                )}
                            </Field>
                        </Stack>

                        {/* Submit button */}
                        <Stack direction={"row"} sx={{mt: "10px", alignItems: "center", justifyContent: "space-between"}}>
                            <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
                                <Button variant="contained" type='submit'>
                                    Add card
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </form>
                )}
            </Formik>
        </Box>
    )
  }


export default CreditCard