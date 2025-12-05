import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRIES = [
  { code: "CR", dialCode: "+506", name: "Costa Rica", placeholder: "88888888", maxLength: 8 },
  { code: "US", dialCode: "+1", name: "Estados Unidos", placeholder: "2025551234", maxLength: 10 },
  { code: "MX", dialCode: "+52", name: "México", placeholder: "5512345678", maxLength: 10 },
  { code: "PA", dialCode: "+507", name: "Panamá", placeholder: "61234567", maxLength: 8 },
  { code: "NI", dialCode: "+505", name: "Nicaragua", placeholder: "81234567", maxLength: 8 },
  { code: "GT", dialCode: "+502", name: "Guatemala", placeholder: "51234567", maxLength: 8 },
  { code: "HN", dialCode: "+504", name: "Honduras", placeholder: "91234567", maxLength: 8 },
  { code: "SV", dialCode: "+503", name: "El Salvador", placeholder: "71234567", maxLength: 8 },
  { code: "CO", dialCode: "+57", name: "Colombia", placeholder: "3101234567", maxLength: 10 },
  { code: "ES", dialCode: "+34", name: "España", placeholder: "612345678", maxLength: 9 },
  { code: "AR", dialCode: "+54", name: "Argentina", placeholder: "1123456789", maxLength: 10 },
  { code: "CL", dialCode: "+56", name: "Chile", placeholder: "912345678", maxLength: 9 },
  { code: "PE", dialCode: "+51", name: "Perú", placeholder: "912345678", maxLength: 9 },
  { code: "EC", dialCode: "+593", name: "Ecuador", placeholder: "991234567", maxLength: 9 },
  { code: "VE", dialCode: "+58", name: "Venezuela", placeholder: "4121234567", maxLength: 10 },
  { code: "BR", dialCode: "+55", name: "Brasil", placeholder: "11912345678", maxLength: 11 },
];

// Parse a full phone number into country code and local number
function parsePhoneNumber(fullPhone) {
  if (!fullPhone) return { countryCode: "CR", localNumber: "" };
  
  // Remove any spaces or special characters except +
  const cleaned = fullPhone.replace(/[\s\-\(\)]/g, "");
  
  // Try to match against known dial codes (longest first)
  const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
  
  for (const country of sortedCountries) {
    if (cleaned.startsWith(country.dialCode)) {
      return {
        countryCode: country.code,
        localNumber: cleaned.slice(country.dialCode.length)
      };
    }
  }
  
  // Default to Costa Rica if no match
  return { countryCode: "CR", localNumber: cleaned.replace(/^\+/, "") };
}

export default function PhoneInput({ 
  value, 
  onChange, 
  disabled = false,
  className = ""
}) {
  const parsed = parsePhoneNumber(value);
  const [countryCode, setCountryCode] = useState(parsed.countryCode);
  const [localNumber, setLocalNumber] = useState(parsed.localNumber);

  // Update internal state when value prop changes
  useEffect(() => {
    const parsed = parsePhoneNumber(value);
    setCountryCode(parsed.countryCode);
    setLocalNumber(parsed.localNumber);
  }, [value]);

  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];

  const handleCountryChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
    const country = COUNTRIES.find(c => c.code === newCountryCode);
    if (country && localNumber) {
      onChange(`${country.dialCode}${localNumber}`);
    }
  };

  const handleNumberChange = (e) => {
    // Only allow digits
    const digits = e.target.value.replace(/\D/g, "");
    const trimmed = digits.slice(0, selectedCountry.maxLength);
    setLocalNumber(trimmed);
    
    if (trimmed) {
      onChange(`${selectedCountry.dialCode}${trimmed}`);
    } else {
      onChange("");
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Select 
        value={countryCode} 
        onValueChange={handleCountryChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[130px] shrink-0 h-11">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span className="text-base">{getFlagEmoji(countryCode)}</span>
              <span className="text-sm">{selectedCountry.dialCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {COUNTRIES.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="flex items-center gap-2">
                <span className="text-base">{getFlagEmoji(country.code)}</span>
                <span className="text-sm">{country.name}</span>
                <span className="text-xs text-gray-500">{country.dialCode}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder={selectedCountry.placeholder}
        disabled={disabled}
        className="flex-1 h-11"
        maxLength={selectedCountry.maxLength}
      />
    </div>
  );
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export { COUNTRIES, parsePhoneNumber };