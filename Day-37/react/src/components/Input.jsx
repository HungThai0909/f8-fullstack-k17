export const Input = ({ label, error, touched, ...props }) => {
  return (
    <div>
      <label className="block text-white font-medium mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
