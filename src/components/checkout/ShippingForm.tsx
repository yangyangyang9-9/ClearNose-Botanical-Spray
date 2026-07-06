import { useTranslation } from "react-i18next";
import { useCheckoutStore, validateShippingAddress } from "@/store/useCheckoutStore";
import { useMemo } from "react";

const COUNTRY_CODES = ["US", "CA", "GB", "AU", "DE", "FR", "JP", "CN", "SG", "OTHER"];

interface FieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  full?: boolean;
}

const Field = ({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = true,
  full = false,
}: FieldProps) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label
      htmlFor={name}
      className="block text-xs font-medium text-gray-600 mb-1.5"
    >
      {label}
      {required && <span className="text-brand-500 ml-0.5">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200 ${
        error
          ? "border-red-300 focus:border-red-400"
          : "border-gray-200 focus:border-brand-400"
      }`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-500">Required</p>
    )}
  </div>
);

export const ShippingForm = () => {
  const { t } = useTranslation();
  const { shippingAddress, updateShippingAddress } = useCheckoutStore();

  const errors = useMemo(
    () => validateShippingAddress(shippingAddress),
    [shippingAddress]
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display font-bold text-lg text-gray-900 mb-1">
          {t("checkout.shippingAddress")}
        </h2>
        <p className="text-sm text-gray-500">{t("checkout.shippingDesc")}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          name="fullName"
          label={t("checkout.fullName")}
          value={shippingAddress.fullName}
          onChange={(v) => updateShippingAddress({ fullName: v })}
          error={errors.fullName}
          full
          placeholder="John Doe"
        />
        <Field
          name="email"
          label={t("checkout.email")}
          type="email"
          value={shippingAddress.email}
          onChange={(v) => updateShippingAddress({ email: v })}
          error={errors.email}
          placeholder="john@example.com"
        />
        <Field
          name="phone"
          label={t("checkout.phone")}
          type="tel"
          value={shippingAddress.phone}
          onChange={(v) => updateShippingAddress({ phone: v })}
          error={errors.phone}
          placeholder="+1 234 567 890"
        />
        <Field
          name="addressLine1"
          label={t("checkout.addressLine1")}
          value={shippingAddress.addressLine1}
          onChange={(v) => updateShippingAddress({ addressLine1: v })}
          error={errors.addressLine1}
          full
          placeholder="123 Main Street"
        />
        <Field
          name="addressLine2"
          label={t("checkout.addressLine2")}
          value={shippingAddress.addressLine2}
          onChange={(v) => updateShippingAddress({ addressLine2: v })}
          required={false}
          full
          placeholder="Apt, Suite, etc."
        />
        <Field
          name="city"
          label={t("checkout.city")}
          value={shippingAddress.city}
          onChange={(v) => updateShippingAddress({ city: v })}
          error={errors.city}
          placeholder="New York"
        />
        <Field
          name="state"
          label={t("checkout.state")}
          value={shippingAddress.state}
          onChange={(v) => updateShippingAddress({ state: v })}
          error={errors.state}
          placeholder="NY"
        />
        <Field
          name="postalCode"
          label={t("checkout.postalCode")}
          value={shippingAddress.postalCode}
          onChange={(v) => updateShippingAddress({ postalCode: v })}
          error={errors.postalCode}
          placeholder="10001"
        />
        <div>
          <label
            htmlFor="country"
            className="block text-xs font-medium text-gray-600 mb-1.5"
          >
            {t("checkout.country")}
            <span className="text-brand-500 ml-0.5">*</span>
          </label>
          <select
            id="country"
            value={shippingAddress.country}
            onChange={(e) => updateShippingAddress({ country: e.target.value })}
            className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200 ${
              errors.country
                ? "border-red-300"
                : "border-gray-200 focus:border-brand-400"
            }`}
          >
            {COUNTRY_CODES.map((code) => (
              <option key={code} value={code}>
                {t(`checkout.countries.${code}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
