import { useForm } from "react-hook-form";
import { useCreateStaff } from "../hooks/useCreateStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBirthdayCake,
  faMapMarkerAlt,
  faPhone,
  faGraduationCap,
  faEnvelope,
  faLock,
  faUserPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

export default function AddStaff() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createNewStaff, isPending } = useCreateStaff();

  const onSubmit = (data) => {
    createNewStaff(data);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add New Staff Member
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the information below to create a new staff account.
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        {/* Form Fields Container */}
        <div className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-400"
                  />
                  First Name
                </label>
                <input
                  {...register("first_name", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <span className="text-red-500 text-xs mt-1">
                    First name is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-400"
                  />
                  Last Name
                </label>
                <input
                  {...register("last_name", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <span className="text-red-500 text-xs mt-1">
                    Last name is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    className="mr-2 text-gray-400"
                  />
                  Age
                </label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter age"
                />
                {errors.age && (
                  <span className="text-red-500 text-xs mt-1">
                    Age is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-gray-400"
                  />
                  Address
                </label>
                <input
                  {...register("address", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter full address"
                />
                {errors.address && (
                  <span className="text-red-500 text-xs mt-1">
                    Address is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Contact & Professional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="mr-2 text-gray-400"
                  />
                  Telephone
                </label>
                <input
                  {...register("telephone", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter phone number"
                />
                {errors.telephone && (
                  <span className="text-red-500 text-xs mt-1">
                    Telephone is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="mr-2 text-gray-400"
                  />
                  Qualification
                </label>
                <input
                  {...register("qualification", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter qualification"
                />
                {errors.qualification && (
                  <span className="text-red-500 text-xs mt-1">
                    Qualification is required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-gray-400"
                  />
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    Email is required
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="mr-2 text-gray-400"
                  />
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    Password is required
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 focus:ring-2 focus:ring-primary-200 transition-colors duration-200"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Creating Staff Account...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Create Staff Account
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
