function AuthInput({ type, name, placeholder, onChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="
        w-full
        h-12
        px-4
        rounded-xl
        border
        outline-none
        focus:ring-2
        focus:ring-black
      "
    />
  );
}

export default AuthInput;
