import { FinalPrice } from "components/display/final-price";
import React, { FC, useState } from "react";
import { Product } from "types/product";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";
import { color } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useToBeImplemented } from "hooks/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, cartStorageState } from "state";
import { SelectedOptions } from "types/cart";
import { DisplayPrice } from "components/display/price";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const [visible, setVisible] = useState(false);
  //console.log('product.price:', product.price, 'isNaN:', isNaN(parseFloat(product.price)));

  // const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);
  useRecoilValue(cartStorageState);

  const alertAddToCartSuccessfull = useToBeImplemented({
    position: "top",
    text:
      true
        ? "Thêm vào giỏ hàng thành công"
        : `Đã xoá ${product?.name} khỏi giỏ hàng`,
  });


  const handleclick = (open: () => void) => {
    if (product.price === -1) {
      const confirmCall = window.confirm('Vui lòng gọi để biết thêm thông tin về sản phẩm.');

      // Nếu người dùng nhấn OK, sẽ thực hiện gọi điện
      if (confirmCall) {
        window.location.href = 'tel:0916847711'; // Thay số điện thoại bằng số bạn cần
      }
      return;
    }
    open();
  };

  const addToCart = (pro) => {
    console.log("Ko ...: ", pro);
    console.log("Co ...: ", { ...pro });

    if (pro) {
      setCart((cart) => { // [.....]
        let res = [...cart];  // res = [.....]
        const existed = cart.find( // tim trong cart 
          (item) =>
            item.product.id === pro.id // dk san pham co ma = voi san pham truyen vao
        ); // existed = san pham da tim thay
        if (existed) {
          res.splice(cart.indexOf(existed), 1, { // xoa san pham cu 
            ...existed, // them san pham moi
            quantity: existed.quantity + 1, // voi so luong tang 1 don vi
          });
        } else {
          res.push({
            product: pro,
            options: {},
            quantity: 1
          });
        }
        return res;
      });
    }
    setVisible(false);
    alertAddToCartSuccessfull();
  };

  return (
    <ProductPicker product={product}>
      {({ open }) => (
        <div className="space-y-2" style={{ border: '4px solid #3e4094 rgba(62, 64, 148, 0.5)',
         borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
         onClick={open}>
          <Box className="w-full aspect-square relative">
            <img loading="lazy" src={product.image}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-contain object-center rounded-lg bg-skeleton"              
            />
          </Box>
          <Text className="ml-1" style={styles.productName}>{product.name}</Text>

          <Text size="xSmall" className="text-[#4d4d4d] pb-2 flex justify-between items-center px-2">
            <span className="text-red-500 font-bold text-sm mr-2">
                {!product.price || product.price == -1 ? ( "Liên hệ" ) : ( <FinalPrice>{product}</FinalPrice>)}

              </span>
          </Text>

        </div>
      )}
    </ProductPicker>
  );
};

const styles = {
  productName: {
    width: '100%',
    whiteSpace: 'nowrap', // Không cho văn bản xuống dòng
    overflow: 'hidden', // Ẩn phần văn bản tràn ra ngoài
    textOverflow: 'ellipsis', // Thay thế phần văn bản bị ẩn bằng dấu ba chấm
  },
};