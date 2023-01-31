import React, { useState, useEffect } from 'react'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  divider,
  Paper,
} from '@mui/material'
import { commerce } from '../../../lib/Commerce'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkToken, setCheckToken] = useState(null)

  // Dynamic form for Address and Payment
  const Form = () => {
    if (activeStep === 0) {
      return <AddressForm checkToken={checkToken} />
    } else {
      return <PaymentForm />
    }
  }

  // ConFirmations Form
  const Confirmation = () => {
    return (
      <>
        <h4 className="d-flex justify-content-center py-5">confirmation</h4>
      </>
    )
  }

  // Token generation from commerce.js

  useEffect(() => {
    const generateToken = async () => {
      try {
        const { id } = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })
        setCheckToken(id)
      } catch (error) {
        console.log(error)
      }
    }
    generateToken()
  }, [cart])

  return (
    <>
      <div className="container">
        <main>
          <Paper className="py-5">
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            <div className="container px-5">
              <Stepper activeStep={activeStep} className="px-5">
                {steps.map((step) => {
                  return (
                    <Step key={step}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </div>

            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkToken?<Form /> : <h3 className='text-center py-5'>Loading Form Field</h3>
            )}
          </Paper>
        </main>
      </div>
    </>
  )
}

export default Checkout
