"use client";
import style from "./CartItem.module.css";
import { MainContext } from "@/context/MainContext";
import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import { Trash, DotsThreeVertical, Minus, Plus } from "@phosphor-icons/react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { NOOffer } from "@/utils/DataStore";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [removing, setRemoving] = useState(false);
  let { xtFlagLogin, setXtFlagSpinnerShow } = useContext(MainContext);

  const alertB = () =>
    Swal.fire({
      position: "center",
      icon: "error",
      title: "بیش تر از یک عدد مجاز به سفارش نمی باشید...",
      showConfirmButton: true,
      timer: 1500,
    });

  const addClick = () => {
    setQuantity((prev) => Number(prev) + 1);
    props.updateQuantity(props.cyProductID, quantity + 1);
  };

  const minesClick = () => {
    if (quantity > 1) {
      setQuantity((prev) => Number(prev) - 1);
      props.updateQuantity(props.cyProductID, quantity - 1);
    }
  };

  const changeHandler = (e) => {
    if (e.target.value >= 0 && e.target.value <= 1) {
      setQuantity(e.target.value);
    } else if (e.target.value == 0 || e.target.value > 1) {
      alertB();
    }
    props.updateQuantity(props.cyProductID, e.target.value);
  };

  const handleRemove = (e) => {
    setRemoving(true);
    setTimeout(() => {
      xtFlagLogin ? props.remove(props.id) : props.handleRemove(props.id);
    }, 300);
  };

  const AlertA = (func) =>
    Swal.fire({
      title: "آیا از حذف محصول از سبد خرید اطمینان دارید ؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله،حذف بشه...",
      cancelButtonText: "نه ،حذف نشه...",
    }).then((result) => {
      if (result.isConfirmed) {
        func();
      }
    });

  // محاسبه درصد تخفیف
  const hasDiscount = props.unitPrice !== null && props.WithoutOffPrice !== null && Number(props.WithoutOffPrice) > Number(props.unitPrice);
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(props.unitPrice) / Number(props.WithoutOffPrice)) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={removing ? { opacity: 0, x: 80, scale: 0.95 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={style.card}
    >
      <div className={style.row}>
        {/* تصویر */}
        <div className={style.imageWrap}>
          <img src={props.smallImage} alt={props.name} loading="lazy" />
        </div>

        {/* اطلاعات محصول */}
        <div className={style.info}>
          {/* نام محصول */}
          <div className={style.name}>
            <a
              href={xtFlagLogin ? `product/${props.cyProductID}` : `product/${props.id}`}
              onClick={() => setXtFlagSpinnerShow(true)}
            >
              {props.name}
            </a>
          </div>

          {/* وضعیت موجودی */}
          {props.supply === 0 && (
            <span className={style.soldOut}>
              <span>●</span> نا موجود
            </span>
          )}

          {/* قیمت‌ها */}
          <div className={style.priceRow}>
            {/* قیمت نهایی (با تخفیف) */}

            {(props.offer.offerType == NOOffer && (props.WithoutOffPrice == props.unitPrice)) ?
              <span className={style.currentPrice}>
                {Number(props.unitPrice).toLocaleString()} <small>تومان</small>
              </span> :
              <>
                <span className={style.currentPrice}>
                  {Number(props.unitPrice).toLocaleString()} <small>تومان</small>
                </span>
                <span className={style.oldPrice}>
                  {Number(props.WithoutOffPrice).toLocaleString()} تومان
                </span>
              </>


            }




            {/* {
              (props.totalPrice !== null && props.totalPrice !== undefined) ? (
              <span className={style.currentPrice}>
                {Number(props.totalPrice).toLocaleString()} <small>تومان</small>
              </span>
            ) : props.unitPrice !== null ? (
              <span className={style.currentPrice}>
                {Number(props.unitPrice).toLocaleString()} <small>تومان</small>
              </span>
            ) : null} */}

            {/* قیمت بدون تخفیف (خط خورده) */}
            {/* {hasDiscount && (
              <span className={style.oldPrice}>
                {Number(props.WithoutOffPrice).toLocaleString()} تومان
              </span>
            )} */}

            {/* برچسب درصد تخفیف */}
            {discountPercent > 0 && (props.offer.offerType != NOOffer || props.WithoutOffPrice != props.unitPrice) && (
              <span className={style.offBadge}>
                {discountPercent}% تخفیف
              </span>
            )}
          </div>
        </div>

        {/* کنترل‌ها */}
        <div className={style.actions}>
          {/*  Stepper تعداد */}
          <div className={style.stepper}>
            <button
              className={style.stepperBtn}
              onClick={minesClick}
              disabled={quantity <= 1}
              aria-label="کاهش تعداد"
            >
              <Minus weight="bold" size={14} />
            </button>
            <input
              type="number"
              className={style.stepperInput}
              value={quantity}
              min={1}
              max={1}
              onChange={(e) => changeHandler(e)}
            />
            <button
              className={style.stepperBtn}
              onClick={addClick}
              disabled={quantity >= 1}
              aria-label="افزایش تعداد"
            >
              <Plus weight="bold" size={14} />
            </button>
          </div>

          {/* دکمه حذف */}
          <button
            className={style.removeBtn}
            onClick={(e) => {
              AlertA(handleRemove);
            }}
            aria-label="حذف محصول"
          >
            <Trash size={18} weight="duotone" />
          </button>

          {/* دکمه جزییات (موبایل) */}
          <Link
            href={xtFlagLogin ? `product/${props.cyProductID}` : `product/${props.id}`}
            className={style.detailBtn}
            onClick={() => setXtFlagSpinnerShow(true)}
          >
            <DotsThreeVertical size={20} weight="bold" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;