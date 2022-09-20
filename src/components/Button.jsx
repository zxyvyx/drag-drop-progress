import React from "react";
import {NavLink} from "react-router-dom";

export default function Button({
  navigationType = "button",
  type = "primary",
  name,
  click,
  customStyle,
  isDisabled = false,
  ...props
}) {
  return (
    <>
      {navigationType === "externalLink" ? (
        <a
          href={props.href}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${customStyle} ${
            type === "primary"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          {props.children}
        </a>
      ) : navigationType === "internalLink" ? (
        <NavLink
          to={props.to}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${customStyle} ${
            type === "primary"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          {props.children}
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={click}
          disabled={isDisabled}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-3xl ${customStyle} ${
            type === "primary"
              ? "bg-primaryDefault border border-primaryDefault text-white hover:bg-gradient-to-tl hover:from-primaryDark hover:to-primaryDefault disabled:border-primaryBright disabled:bg-primaryBright disabled:hover:bg-primaryBright disabled:hover:from-primaryBright disabled:hover:to-primaryBright disabled:text-primaryLight"
              : "bg-white border border-primaryDefault text-neutralDark hover:bg-gradient-to-tl hover:from-primaryBright hover:to-primaryLight"
          }`}
        >
          {props.children}
        </button>
      )}
    </>
  );
}
