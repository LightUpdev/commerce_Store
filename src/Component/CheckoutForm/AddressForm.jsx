import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/Commerce'
import FormInput from './CustomTextField'

const AddressForm = ({ checkToken }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubDivisions, setShippingSubDivisions] = useState([])
  const [shippingSubDivision, setShippingSubDivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')

  //   GETTING THE SHIPPING COUNTRIES
  useEffect(() => {
    const getShippingCountries = async (token) => {
      const { countries } = await commerce.services.localeListShippingCountries(
        token,
      )
      const shippingCountries = Object.entries(countries)
      setShippingCountries(shippingCountries)
      const shippingCountry = Object.keys(countries)[0]
      setShippingCountry(shippingCountry)
    }
    getShippingCountries(checkToken)
  }, [])
  // !!!  GETTING THE SHIPPING COUNTRIES

  //   GETTING THE SHIPPING SUB-DIVISION
  const getShippingSubDivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode,
    )
    const allSubdivisions = Object.entries(subdivisions)
    setShippingSubDivisions(allSubdivisions)
    const subDivision = Object.keys(subdivisions)[0]
    setShippingSubDivision(subDivision)
  }
  useEffect(() => {
    if (shippingCountry) getShippingSubDivision(shippingCountry)
  }, [shippingCountry])

  //  !!! GETTING THE SHIPPING SUB-DIVISION

  //   GETTING THE SHIPPING OPTIONS
  const getShippingOptions = async (tokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(tokenId, {
      country,
      region,
    })
    setShippingOptions(options)
  }

  useEffect(() => {
    shippingSubDivision &&
      getShippingOptions(checkToken, shippingCountry, shippingSubDivision)
  }, [shippingSubDivision])

  // !!!  GETTING THE SHIPPING OPTIONS

  const countries = shippingCountries.map(([code, name]) => ({
    id: code,
    label: name,
  }))

  const subDivisions = shippingSubDivisions.map(([code, name]) => ({
    id: code,
    label: name,
  }))

  const options = shippingOptions.map((opt) => {
    return {
      id: opt.id,
      label: `${opt.description}-${opt.price.formatted_with_symbol}`,
    }
  })

  const methods = useForm()
  return (
    <div className="py-3 px-5">
      <Typography variant="h6" gutterBottom className="my-3">
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput
              name="firstName"
              label="firstName"
              placeholder="First Name"
            />
            <FormInput
              name="lastName"
              label="lastName"
              placeholder="Last Name"
            />
            <FormInput name="address" label="address" placeholder="Address" />
            <FormInput name="email" label="email" placeholder="Email" />
            <FormInput name="city" label="city" placeholder="City" />
            <FormInput name="zip" label="zip" placeholder="ZIP/Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullwidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Sub-divisions</InputLabel>
              <Select
                value={shippingSubDivision}
                fullwidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subDivisions.map((subdivision) => {
                  return (
                    <MenuItem key={subdivision.id} value={subdivision.id}>
                      {subdivision.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullwidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((shippingOption) => {
                  return (
                    <MenuItem
                      key={shippingOption.id}
                      value={shippingOption.label}
                    >
                      {shippingOption.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div className="d-flex justify-content-between">
            <Button component={Link} to='/cart' variant='outlined'>Back to cart</Button>
            <Button type='submit' variant='contained'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default AddressForm
