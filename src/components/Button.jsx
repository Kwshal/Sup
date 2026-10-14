function Button({id, type, btnText, btnFunction}) {
  return (
    <button id={id} type={type} onClick={btnFunction}>
      {btnText}
    </button>
  );
}

export default Button;