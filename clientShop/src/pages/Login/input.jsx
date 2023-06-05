export default function Input({ id, label, placeholder, type, register, errorMessage }) {
  return (
    <div className="input-group">
     <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} {...register} className="text-[1.6rem]" />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
}
