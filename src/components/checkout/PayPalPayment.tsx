import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { useCheckoutStore, isAddressValid } from "@/store/useCheckoutStore";
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_CURRENCY,
  PLANS,
  SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  trackEvent,
} from "@/constants/config";
import { sendOrderNotificationEmail } from "@/utils/notifyEmail";

const LoadingPayPal = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center py-8 text-gray-500">
      <Loader2 className="w-5 h-5 mr-2 animate-spin text-brand-500" />
      <span className="text-sm">{t("checkout.paypalLoading")}</span>
    </div>
  );
};

const PayPalFailed = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-8 text-red-500">
      <AlertCircle className="w-6 h-6 mb-2" />
      <span className="text-sm">{t("checkout.paypalFailed")}</span>
    </div>
  );
};

const ButtonsWrapper = () => {
  const { t } = useTranslation();
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const { selectedPlan, shippingAddress, setStatus, setOrderResult, setError } =
    useCheckoutStore();

  const plan = PLANS[selectedPlan];
  const subtotal = plan.price;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = (subtotal + shipping).toFixed(2);

  const addressValid = isAddressValid(shippingAddress);

  if (isRejected) return <PayPalFailed />;
  if (isPending) return <LoadingPayPal />;

  return (
    <div className={addressValid ? "" : "opacity-60 pointer-events-none"}>
      <PayPalButtons
        style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
        disabled={!addressValid}
        forceReRender={[total, addressValid]}
        createOrder={(_data, actions) => {
          trackEvent("paypal_create_order", { plan: selectedPlan, total });
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: PAYPAL_CURRENCY,
                  value: total,
                },
                description: `${t(plan.nameKey)} — ClearNose Botanical Spray`,
                shipping: {
                  name: { full_name: shippingAddress.fullName },
                  address: {
                    address_line_1: shippingAddress.addressLine1,
                    address_line_2: shippingAddress.addressLine2 || undefined,
                    admin_area_2: shippingAddress.city,
                    admin_area_1: shippingAddress.state,
                    postal_code: shippingAddress.postalCode,
                    country_code: shippingAddress.country === "OTHER" ? "US" : shippingAddress.country,
                  },
                },
              },
            ],
          });
        }}
        onApprove={async (_data, actions) => {
          setStatus("processing");
          try {
            const details = await actions.order?.capture();
            trackEvent("paypal_payment_success", {
              plan: selectedPlan,
              orderID: details?.id,
            });

            const orderResult = {
              orderID: details?.id || "",
              payerName:
                details?.payer?.name?.given_name
                  ? `${details.payer.name.given_name} ${details.payer.name.surname ?? ""}`.trim()
                  : shippingAddress.fullName,
              payerEmail: details?.payer?.email_address || shippingAddress.email,
            };
            setOrderResult(orderResult);

            // 发送订单通知邮件（含配送地址）
            sendOrderNotificationEmail({
              orderResult,
              shippingAddress,
              selectedPlan,
              total: parseFloat(total),
            });

            setStatus("success");
          } catch (err) {
            trackEvent("paypal_payment_error", { error: String(err) });
            setError(
              err instanceof Error ? err.message : "Payment capture failed"
            );
          }
        }}
        onError={(err) => {
          trackEvent("paypal_payment_error", { error: String(err) });
          setError("PayPal payment error");
        }}
      />
      {!addressValid && (
        <p className="text-xs text-gray-400 text-center mt-2">
          {t("checkout.fillAddressFirst")}
        </p>
      )}
    </div>
  );
};

export const PayPalPayment = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 mb-1">
            {t("checkout.payment")}
          </h2>
          <p className="text-sm text-gray-500">{t("checkout.paymentDesc")}</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Lock className="w-3.5 h-3.5" />
          SSL
        </span>
      </div>

      {mounted && PAYPAL_CLIENT_ID !== "test" ? (
        <PayPalScriptProvider
          options={{
            clientId: PAYPAL_CLIENT_ID,
            currency: PAYPAL_CURRENCY,
            intent: "capture",
          }}
        >
          <ButtonsWrapper />
        </PayPalScriptProvider>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <AlertCircle className="w-6 h-6 mb-2 text-yellow-500" />
          <span className="text-sm text-center">
            {t("checkout.paypalFailed")}
          </span>
          <code className="mt-2 text-xs text-gray-400">
            VITE_PAYPAL_CLIENT_ID not configured
          </code>
        </div>
      )}
    </div>
  );
};
