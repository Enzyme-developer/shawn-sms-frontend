import React from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-hot-toast";
import useUser from "hooks/useUser";
import "./payment.css"

const PayButton = ({ amount, email, className }) => {
  const publicKey = "";
  const [reference, setReference] = React.useState("");
  const { refreshUser } = useUser();
  const handlePaystackSuccessAction = (reference) => {
    setReference(reference);
    refreshUser();
    toast.success(
      "Payment successful, please wait for a few seconds for your account to be reset ",
      {
        duration: 15000,
      }
    );

    setTimeout(() => {
      window.location.reload();
    }, 60000);
  };

  const componentProps = {
    email,
    amount,
    publicKey,

    className: "paystack",
    text: "Fund Account",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: () => alert("Payment canceled by user."),
  };

  return <PaystackButton {...componentProps} />;
};

export default PayButton;
