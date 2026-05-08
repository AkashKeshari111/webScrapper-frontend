function AuthButton({ text }) {
  return (
    <button
      type="submit"
      className="
        w-full
        h-12
        rounded-xl
        bg-black
        text-white
        font-medium
        hover:opacity-90
        transition
        cursor-pointer
      "
    >
      {text}
    </button>
  );
}

export default AuthButton;
