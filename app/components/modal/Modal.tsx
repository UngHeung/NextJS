/**
 * 모달 컴포넌트
 *
 * primary : 확인
 * secondary : 동의
 */

"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { modalData } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import "./Modal.css";

export type ModalType = "primary" | "secondary" | "tertiary";
export interface ModalOption {
  ok: boolean;
  title: string;
  message: string;
  url?: string;
}

const Modal = () => {
  const modal = useRecoilValue(modalData);
  const resetModal = useResetRecoilState(modalData);
  const router = useRouter();
  const [isShow, setIsShow] = useState(modal.isShow);

  useEffect(() => {
    const checkBtn = document.querySelector(".on-focus") as HTMLButtonElement;
    setIsShow(modal.isShow);
    isShow && checkBtn.focus();
  }, [isShow, modal.isShow]);

  const checkModal = () => {
    resetModal();
    setIsShow(false);
  };

  const renderButton = (type: ModalType) => {
    switch (type) {
      case "primary":
        return (
          <button
            className="button btn-normal on-focus"
            onClick={() => {
              if (modal.url) {
                router.refresh();
                router.push(modal.url);
              }
              checkModal();
            }}
          >
            확인
          </button>
        );

      case "secondary":
        return (
          <>
            <button className="button btn-login" onClick={checkModal}>
              확인
            </button>

            <button className="button btn-normal on-focus" onClick={checkModal}>
              취소
            </button>
          </>
        );

      case "tertiary":
        return (
          <>
            {setTimeout(() => {
              resetModal();
            }, 1000)}
          </>
        );
    }
  };

  return (
    <div className="modal-cover" style={{ display: isShow ? "block" : "none" }}>
      <section className="modal-content-wrap">
        <h3 className="modal-title">{modal.title}</h3>
        <hr className="modal-line" />
        <p className="modal-message">{modal.message}</p>
        <div className="modal-button-wrap">{renderButton(modal.type as ModalType)}</div>
      </section>
    </div>
  );
};

export default Modal;
