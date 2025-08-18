"use client"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa"

export default function Footer() {
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([])
  const [modalMessage, setModalMessage] = useState<string | null>(null)
  const [modalType, setModalType] = useState<"success" | "error" | null>(null)

  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email").required("Required"),
  })

  const handleSubmit = (values: { email: string }, { resetForm }: any) => {
    if (subscribedEmails.includes(values.email)) {
      setModalType("error")
      setModalMessage("This email is already subscribed!")
    } else {
      setSubscribedEmails([...subscribedEmails, values.email])
      setModalType("success")
      setModalMessage("Thank you for subscribing!")
      resetForm()
    }
  }

  return (
    <footer className="bg-[#4B2615] text-white relative">
      {/* Modal */}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50"></div>
          <div
            className={`relative z-[101] p-6 rounded-xl shadow-xl max-w-sm text-center ${
              modalType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <p className="text-white text-lg font-medium">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
            {/* Email Subscription Box */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-md">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange
                validateOnBlur
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <>
                    <Form className="flex flex-row items-center gap-2">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="px-2 py-1 text-black text-sm w-64 sm:w-80 bg-white outline-none focus:outline-none border-none"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || !isValid || !dirty}
                        className={`px-4 sm:px-6 py-1 rounded-md text-white text-sm transition-colors
                        ${isSubmitting || !isValid || !dirty
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#4A2C17] hover:bg-[#3B2418]"
                        }`}
                      >
                        {isSubmitting ? "Submitting..." : "Subscribe"}
                      </button>
                    </Form>
                    {/* Inline Error below form */}
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </>
                )}
              </Formik>
            </div>

            {/* Contacts Text */}
            <span className="text-white">Contacts</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <FaTwitter className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            <FaGooglePlusG className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border-t border-white/20 w-[90%]"></div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm sm:text-base">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">About</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Our Strategy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Our Advantages</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Social Responsibility</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Our Services</span>
          </div>
          <div className="text-sm text-white/80">© 2024. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
