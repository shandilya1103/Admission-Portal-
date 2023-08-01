
export const SuccessAlert = ({ message }) => {
    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-3 relative flex" role="alert">
            <span className="bottom-0 text-green-400 h-5 w-5 mr-4" style={{ minWidth: 20 }}>
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
            </span>
            <span className="text-sm">{ message }</span>
        </div>       
    )
}

export const InfoAlert = ({ message }) => {
    return (
        <div className="bg-sky-100 border border-sky-200 text-sky-700 px-4 py-3 mt-3 relative flex" role="alert">
            <span className="bottom-0 text-sky-500 h-5 w-5 mr-4" style={{ minWidth: 20 }}>
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
            </span>
            <span className="text-sm">{ message }</span>
        </div>       
    )
}

export const WarningAlert = ({ message }) => {
    return (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mt-3 relative flex" role="alert">
            <span className="bottom-0 text-yellow-500 h-5 w-5 mr-4" style={{ minWidth: 20 }}>
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
            </span>
            <span className="text-sm">{ message }</span>
        </div>       
    )
}

export const DangerAlert = ({ message }) => {
    return (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 mt-3 relative flex" role="alert">
            <span className="bottom-0 text-red-400 h-5 w-5 mr-4" style={{ minWidth: 20 }}>
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
            </span>
            <span className="text-sm">{ message }</span>
        </div>       
    )
}