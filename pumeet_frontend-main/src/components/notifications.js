import 'react-app-polyfill/ie11';
import * as React from 'react';


export function SuccessNotification({ message }) {
  return (
    <div className="w-80 border-1 border-gray-100 bg-white p-4 text-sm flex items-center rounded-lg shadow relative">
      <button
        type="button"
        className="absolute right-0 w-4 text-green-400 m-3"
        onClick={(el) => { el.currentTarget.parentElement.parentElement.style.display = "none" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-5 h-5 text-green-500 mr-2 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className='text-current text-slate- font-light pr-2'>
        {message}
      </p>
    </div>
  );
}

export function InfoNotification({ message }) {
  return (
    <div className="w-80 border-1 border-gray-100 bg-white p-4 text-sm flex items-center rounded-lg shadow relative">
      <button
        type="button"
        className="absolute right-0 w-4 text-blue-400 m-3"
        onClick={(el) => { el.currentTarget.parentElement.parentElement.style.display = "none" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className='text-current text-slate- font-light pr-2'>
        {message}
      </p>
    </div>
  );
}

export function WarningNotification({ message }) {
  return (
    <div className="w-80 border-1 border-gray-100 bg-white p-4 text-sm flex items-center rounded-lg shadow relative">
      <button
        type="button"
        className="absolute right-0 w-4 text-yellow-400 m-3"
        onClick={(el) => { el.currentTarget.parentElement.parentElement.style.display = "none" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className='text-current text-slate- font-light pr-2'>
        {message}
      </p>
    </div>
  );
}

export function DangerNotification({ message }) {
  return (
    <div className="w-80 border-1 border-gray-100 bg-white p-4 text-sm flex rounded-lg shadow relative">
      <button
        type="button"
        className="absolute right-0 w-4 text-red-400 mr-3"
        onClick={(el) => { el.currentTarget.parentElement.parentElement.style.display = "none" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-5 h-5 text-red-500 mr-2 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className='text-current text-slate- font-light pr-2'>
        {message}
      </p>
    </div>
  );
}