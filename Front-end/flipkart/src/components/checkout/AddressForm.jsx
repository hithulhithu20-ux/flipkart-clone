const AddressForm = () => {
  return (
    <div className="bg-white p-5">

      <h2 className="mb-5 text-xl font-semibold">
        Delivery place
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <input
          placeholder="Full Name"
          className="border p-3"
        />

        <input
          placeholder="Phone Number"
          className="border p-3"
        />

        <input
          placeholder="Pincode"
          className="border p-3"
        />

        <input
          placeholder="City"
          className="border p-3"
        />

      </div>

      <textarea
        placeholder="Address"
        rows={4}
        className="mt-4 w-full border p-3"
      />

    </div>
  );
};

export default AddressForm;