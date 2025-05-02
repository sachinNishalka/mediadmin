import { useForm } from "react-hook-form";
import { useCreateStaff } from "../hooks/useCreateStaff";

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createNewStaff, isLoading } = useCreateStaff();

  const onSubmit = (data) => {
    createNewStaff(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block mb-1 font-medium">First Name</label>
        <input
          {...register("first_name", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.first_name && (
          <span className="text-red-500 text-xs">First name is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Last Name</label>
        <input
          {...register("last_name", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.last_name && (
          <span className="text-red-500 text-xs">Last name is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Age</label>
        <input
          type="number"
          {...register("age", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.age && (
          <span className="text-red-500 text-xs">Age is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          {...register("address", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.address && (
          <span className="text-red-500 text-xs">Address is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Telephone</label>
        <input
          {...register("telephone", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.telephone && (
          <span className="text-red-500 text-xs">Telephone is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Qualification</label>
        <input
          {...register("qualification", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.qualification && (
          <span className="text-red-500 text-xs">
            Qualification is required
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">Email is required</span>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">Password is required</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
