import React, { FC } from "react";
import { Divider } from "components/divider";
import { Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "hooks/hooks";
import { cartState } from "state";
import { useRecoilValue } from "recoil";

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const cart = useRecoilValue(cartState);

  return (
    <Page className="flex flex-col">
      <Header title="Giỏ hàng" showBackIcon={false} className="bg-textPrimary text-white"/>
      <CartItems />
      {cart.length > 0 && (
        <>
          <Delivery />
          <Divider size={12} />
          <TermsAndPolicies />
          <Divider size={32} className="flex-1" />
          {!keyboardVisible && <CartPreview />}
        </>
      )}
    </Page>
  );
};

export default CartPage;
