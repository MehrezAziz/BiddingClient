import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const PhoneNumberForm = ({ selectCountryBoolean,value,onChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch list of countries from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedCountries = data.map(country => ({
          code: `+${country.ccn3}`,
          name: country.name.common
        }));
        const filteredCountries = formattedCountries.filter(country => country.code !== "+788");
        // Add Tunisia (+216) to the list
        filteredCountries.push({ code: '+216', name: 'Tunisia' });
        // Order the list alphabetically by country name
        filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(filteredCountries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const formik = useFormik({
    initialValues: {
      countryCode: '',
      phoneNumber: '', // Add phone number field to the initial values
    },
    onSubmit: (values) => {
      console.log('Country Code:', values.countryCode);
      console.log('Phone Number:', values.phoneNumber);
    },
    validate: (values) => {
      const errors = {};
      if (!/^\d+$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone number must contain only digits';
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='phoneFields'>
      <div className='phoneFieldGroup'>
        {selectCountryBoolean &&
          <div  className='selectCountryContain'>
            <select className='selectCountry'
              id="countryCode"
              name="countryCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.countryCode}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>
        }

        <div className='phoneNumberInput'>
          <input 
            type="text"
            id="phoneNumber"
            placeholder='Phone number'
            name="phoneNumber"
            onChange={event => {
              formik.handleChange(event);
              onChange(event);
            }}
            //onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value}
            //value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PhoneNumberForm;
