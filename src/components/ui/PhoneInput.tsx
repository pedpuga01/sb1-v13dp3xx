import React from 'react';
import { countryCodes } from '../../data/countryCodes';

interface PhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PhoneInput({ value = '', onChange, className = '' }: PhoneInputProps) {
  const [countryCode, number] = value ? value.split(' ') : ['+56', ''];

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${e.target.value} ${number}`);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, '');
    onChange(`${countryCode} ${newNumber}`);
  };

  return (
    <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 ${className}`}>
      <select
        value={countryCode}
        onChange={handleCountryCodeChange}
        className="w-full sm:w-auto rounded-md border-gray-300 focus:ring-primary focus:border-primary sm:text-sm sm:rounded-r-none"
      >
        {countryCodes.map(({ code, country }) => (
          <option key={code} value={code}>
            {code} {country}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        placeholder="912345678"
        className="w-full rounded-md sm:rounded-l-none border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  );
}